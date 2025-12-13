// src/app/payment/success/page.tsx
'use client'

import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader, AlertCircle, ArrowRight, Mail, FileText } from 'lucide-react';
import { useTestStore } from '@/lib/store';
import { webhookService } from '@/services/webhookServices';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    person1Name,
    person2Name,
    person1Answers,
    person2Answers,
    person1Profile,
    person2Profile,
    compatibility,
  } = useTestStore();

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    whatsapp: string;
    amount: string;
    transactionId: string;
  } | null>(null);

  useEffect(() => {
    // Get payment details from URL params
    const orderId = searchParams.get('order_id');
    const statusCode = searchParams.get('status_code');
    const transactionStatus = searchParams.get('transaction_status');
    const transactionId = searchParams.get('transaction_id');

    // Idempotency Check: Prevent double processing on reload
    // We use sessionStorage so it persists during the session (reloads) but clears on browser close
    if (orderId) {
      const storageKey = `payment_processed_${orderId}`;
      if (typeof window !== 'undefined' && sessionStorage.getItem(storageKey)) {
        // If already processed, just restore state or do nothing (user sees success UI)
        // We might want to ensure we show "Success" state if it was successful before?
        // For now, let's just assume if it's in storage, we don't trigger backend.
        // But we DO need to show the UI. 
        // Actually, if we skip 'verifyAndProcessPayment', the state remains 'verifying'.
        // We should probably just call verifying but NOT send the webhook?
        // Or simpler: The previous logic sets state to 'success' at the end.
        // If we skip, we must manually set 'success' and 'orderDetails' if possible.
        // However, retrieving order details from LS might be complex if we didn't save them.

        // BETTER APPROACH:
        // Let verifyAndProcessPayment run, but inside it, check storage before sending webhook.
        // But verifyAndProcessPayment sets the UI state.

        // Let's modify verifyAndProcessPayment instead? 
        // No, the instruction was to modify the useEffect or the check.

        // Let's keep it simple:
        // If processed, we still probably want to show the "Success" UI.
        // The current code fetches data from params.
        // If we block the WHOLE function, we get stuck on "Verifying...".

        // So, we should ALLOW UI rendering but BLOCK the webhook.
        // The webhook is sent in `sendAnalysisRequest`.

        // Let's change the plan slightly to be more robust:
        // Pass a flag to verifyAndProcessPayment?
        // Or check storage inside logic?

        // Let's stick to the plan: "Check if key exists... If no, set key and proceed."
        // Wait, if I block `verifyAndProcessPayment`, the UI dies.
        // I need to prevent the *expensive* part (backend trigger).

        // Let's proceed with calling the function, but inside the function verify valid status.
        // Actually `verifyAndProcessPayment` does:
        // 1. Validate status
        // 2. Get whatsapp
        // 3. Set UI status 'success'
        // 4. `sendAnalysisRequest` (THIS is the duplicate trigger)

        // So I should wrap `sendAnalysisRequest` call or check inside it.

        // But the previous `useRef` block prevented the WHOLE `verifyAndProcessPayment`.
        // If I restore THAT behavior with sessionStorage, the user who reloads checks "Verifying..." forever.
        // That is BAD UX. 

        // So `useRef` was actually "wrong" for reloads too if it blocked UI?
        // Ah, `useRef` is false on reload, so code runs again.

        // If I use `sessionStorage`, I block it permenantly for that session.
        // So I MUST parse params and show success, but NOT send webhook.

        // If processed, we still want to show the "Success" UI (so we call the function),
        // but we MUST prevent the expensive webhook trigger.
        verifyAndProcessPayment(orderId, statusCode, transactionStatus, transactionId, true);
        return;
      }
    }

    verifyAndProcessPayment(orderId, statusCode, transactionStatus, transactionId, false);
  }, [searchParams]);

  const verifyAndProcessPayment = async (
    orderId: string | null,
    statusCode: string | null,
    transactionStatus: string | null,
    transactionId: string | null,
    skipWebhook: boolean = false
  ) => {
    try {
      // Validate payment success
      // valid status untuk sandbox & production
      const validStatusCodes = ['200', '201'];
      const validTransactionStatuses = ['settlement', 'capture', 'success'];

      if (!statusCode || !validStatusCodes.includes(statusCode) || !validTransactionStatuses.includes(transactionStatus || '')) {
        if (transactionStatus === 'pending') {
          setStatus('error');
          setErrorMessage('Pembayaran masih dalam proses. Silakan tunggu konfirmasi.');
          return;
        }
        throw new Error('Pembayaran tidak berhasil atau masih pending');
      }


      // Get whatsapp from localStorage or query param
      const whatsapp = searchParams.get('whatsapp') || localStorage.getItem('payment_whatsapp') || '';

      if (!whatsapp) {
        throw new Error('Nomor WhatsApp tidak ditemukan');
      }

      // Store order details
      setOrderDetails({
        orderId: orderId || 'N/A',
        whatsapp: whatsapp,
        amount: 'Rp 14.899',
        transactionId: transactionId || 'N/A'
      });

      // Send analysis request if we have all data
      // Send analysis request if we have all data
      // We pass the skipWebhook flag to prevent double processing
      if (!skipWebhook) {
        // We now handle data verification INSIDE sendAnalysisRequest
        // to support fallback to localStorage if store is empty
        await sendAnalysisRequest(orderId || '', whatsapp);
      }

      setStatus('success');

      // Mark as processed in session storage to prevent double trigger on reload
      if (orderId) {
        sessionStorage.setItem(`payment_processed_${orderId}`, 'true');
      }

      // Clear payment whatsapp from localStorage
      localStorage.removeItem('payment_whatsapp');
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat memverifikasi pembayaran');
    }
  };

  const sendAnalysisRequest = async (orderId: string, whatsapp: string) => {
    // 1. Try to get data from Store (Zustand)
    let p1Name = person1Name;
    let p2Name = person2Name;
    let p1Answers = person1Answers;
    let p2Answers = person2Answers;
    let p1Profile = person1Profile;
    let p2Profile = person2Profile;
    let compat = compatibility;

    // 2. Fallback: Try to get from LocalStorage if store is empty
    // This handles cases where hydration hasn't finished or context is lost
    if (!p1Profile || !p2Profile || !compat) {
      console.log('Store data missing, attempting fallback to localStorage...');
      try {
        const storedData = localStorage.getItem('personality-test-storage');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          if (parsed.state) {
            const s = parsed.state;
            p1Name = s.person1Name || p1Name;
            p2Name = s.person2Name || p2Name;
            p1Answers = s.person1Answers || p1Answers;
            p2Answers = s.person2Answers || p2Answers;
            p1Profile = s.person1Profile || p1Profile;
            p2Profile = s.person2Profile || p2Profile;
            compat = s.compatibility || compat;
            console.log('Data recovered from localStorage');
          }
        }
      } catch (e) {
        console.error('Failed to parse localStorage fallback:', e);
      }
    }

    // 3. Final Check
    if (!p1Profile || !p2Profile || !compat) {
      console.error('CRITICAL: Failed to send webhook. Data missing in both Store and LocalStorage.');
      setErrorMessage('Gagal mengirim data analisis. Silakan hubungi admin.');
      setStatus('error'); // Show error so user knows to contact support
      return;
    }

    try {
      console.log('Sending webhook with data for Order:', orderId);
      const payload = webhookService.createPayload(
        p1Name,
        p1Answers,
        p1Profile,
        p2Name,
        p2Answers,
        p2Profile,
        compat
      );

      const fullPayload = {
        ...payload,
        whatsapp,
        orderId,
        requestType: 'premium_analysis',
        paymentStatus: 'success'
      };

      await webhookService.sendToN8N(fullPayload);
      console.log('Webhook sent successfully!');
    } catch (error) {
      console.error('Error sending analysis request:', error);
      // Don't show error to user - they already paid
    }
  };

  const handleBackToResult = () => {
    router.push('/result');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  // Verifying state
  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            <Loader className="w-16 h-16 mx-auto mb-6 text-purple-500 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Memverifikasi Pembayaran...
            </h1>
            <p className="text-gray-600">
              Mohon tunggu sebentar
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Pembayaran Tidak Berhasil
            </h1>
            <p className="text-gray-600 mb-6">
              {errorMessage || 'Terjadi kesalahan saat memproses pembayaran Anda'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/premium')}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Coba Lagi
              </button>
              <button
                onClick={handleBackToHome}
                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-border p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-2xl mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Pembayaran Berhasil!
          </h1>
          <p className="text-lg text-text-muted">
            Terima kasih atas pembelian Anda
          </p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-secondary border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Detail Pesanan
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium">Order ID:</span>
                <span className="text-right">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium">Transaction ID:</span>
                <span className="text-right break-all text-sm">{orderDetails.transactionId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium">WhatsApp:</span>
                <span className="text-right break-all text-sm">{orderDetails.whatsapp}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Total:</span>
                <span className="text-right font-bold text-primary">{orderDetails.amount}</span>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Langkah Selanjutnya
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>Analisis premium sedang diproses oleh AI kami</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>Hasil akan dikirim ke WhatsApp dalam 5-10 menit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">3.</span>
                  <span>Cek pesan WhatsApp dari bot kami</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">4.</span>
                  <span>Analisis dikirim dalam format pesan chat yang mudah dibaca</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">💡 Tips:</p>
              <p>Jika pesan tidak masuk dalam 15 menit, hubungi support dengan Order ID di atas.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleBackToResult}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            Lihat Hasil Tes Gratis
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button
            onClick={handleBackToHome}
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-gray-800 font-semibold rounded-xl transition-all duration-200"
          >
            Kembali ke Beranda
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            Butuh bantuan? Hubungi support@personalitytest.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}