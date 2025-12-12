// src/app/premium/page.tsx - Updated Clean Gen Z Style
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, CheckCircle, XCircle, Loader, CreditCard } from 'lucide-react';
import { useTestStore } from '@/lib/store';
import { webhookService } from '@/services/webhookServices';
import { midtransService, MIDTRANS_CONFIG } from '@/services/midtransService';

declare global {
  interface Window {
    snap: any;
  }
}

export default function PremiumPage() {
  const router = useRouter();
  const {
    person1Name,
    person2Name,
    person1Answers,
    person2Answers,
    person1Profile,
    person2Profile,
    compatibility,
  } = useTestStore();

  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!person1Name || !person2Name || !person1Profile || !person2Profile || !compatibility) {
      router.push('/');
    }
  }, [person1Name, person2Name, person1Profile, person2Profile, compatibility, router]);

  useEffect(() => {
    const snapScript = document.createElement('script');
    snapScript.src = MIDTRANS_CONFIG.snapUrl || '';
    snapScript.setAttribute('data-client-key', MIDTRANS_CONFIG.clientKey || '');
    snapScript.onload = () => setSnapLoaded(true);
    document.body.appendChild(snapScript);

    return () => {
      document.body.removeChild(snapScript);
    };
  }, []);

  const handlePayment = async () => {
    // Basic validation for phone number (only numbers, min 10 digits)
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (!cleanNumber || cleanNumber.length < 10) {
      setErrorMessage('Mohon masukkan nomor WhatsApp yang valid');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      localStorage.setItem('payment_whatsapp', cleanNumber);

      const paymentResponse = await midtransService.createTransaction(
        cleanNumber,
        person1Name,
        person2Name
      );

      if (!paymentResponse.success || !paymentResponse.token) {
        throw new Error(paymentResponse.error || 'Gagal membuat transaksi');
      }

      if (window.snap) {
        const baseUrl = window.location.origin;

        window.snap.pay(paymentResponse.token, {
          onSuccess: async function (result: any) {
            try {
              const payload = {
                ...webhookService.createPayload(
                  person1Name,
                  person1Answers,
                  person1Profile!,
                  person2Name,
                  person2Answers,
                  person2Profile!,
                  compatibility
                ),
                whatsapp: cleanNumber
              };

              await webhookService.sendToN8N(payload);
            } catch (err) {
              console.error('Error saat kirim webhook:', err);
            }

            const params = new URLSearchParams({
              order_id: result.order_id || '',
              status_code: result.status_code || '200',
              transaction_status: result.transaction_status || 'settlement',
              transaction_id: result.transaction_id || '',
              whatsapp: cleanNumber
            });
            window.location.href = `${baseUrl}/payment/success?${params.toString()}`;
          },

          onPending: function (result: any) {
            const params = new URLSearchParams({
              order_id: result.order_id || '',
              transaction_id: result.transaction_id || '',
              payment_type: result.payment_type || '',
              whatsapp: cleanNumber
            });
            window.location.href = `${baseUrl}/payment/pending?${params.toString()}`;
          },

          onError: function (result: any) {
            const params = new URLSearchParams({
              order_id: result.order_id || '',
              transaction_id: result.transaction_id || '',
              status_message: result.status_message || 'Pembayaran gagal'
            });
            window.location.href = `${baseUrl}/payment/error?${params.toString()}`;
          },

          onClose: function () {
            setIsProcessing(false);
            setErrorMessage('Pembayaran dibatalkan');
            localStorage.removeItem('payment_whatsapp');
          }
        });
      } else {
        throw new Error('Midtrans Snap belum dimuat');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga');
      setIsProcessing(false);
      localStorage.removeItem('payment_whatsapp');
    }
  };

  const handleBack = () => {
    router.push('/result');
  };

  if (!person1Name || !person2Name || !person1Profile || !person2Profile || !compatibility) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-alt">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-border p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-primary" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Analisis Premium AI
            </h1>
            <p className="text-lg text-text-muted">
              Dapatkan insight mendalam dari AI tentang hubungan kalian
            </p>
          </div>

          {/* Features */}
          <div className="bg-secondary rounded-2xl p-6 mb-8 border border-border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Yang Akan Anda Dapatkan:
            </h2>
            <ul className="space-y-3">
              {[
                'Analisis mendalam kepribadian masing-masing',
                'Rekomendasi komunikasi yang efektif',
                'Strategi mengatasi perbedaan',
                'Tips membangun hubungan yang harmonis',
                'Prediksi tantangan dan solusinya',
                'Saran personalisasi berdasarkan profil kalian'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-primary-light border-2 border-primary rounded-2xl p-6 mb-8 text-center">
            <p className="text-text-muted mb-2 font-medium">Harga Spesial</p>
            <p className="text-5xl font-bold text-primary mb-1">Rp 14.899</p>
            <p className="text-sm text-text-muted">Sekali bayar • Hasil dikirim ke WhatsApp</p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Nomor WhatsApp untuk menerima hasil analisis
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setWhatsappNumber(val);
                }}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-gray-900 transition-colors"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-primary bg-primary-light p-3 rounded-xl border border-primary">
                <XCircle className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isProcessing || !snapLoaded}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" strokeWidth={2.5} />
                  Memproses...
                </>
              ) : !snapLoaded ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" strokeWidth={2.5} />
                  Memuat...
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6" strokeWidth={2.5} />
                  Bayar & Dapatkan Analisis
                </>
              )}
            </button>

            <p className="text-center text-sm text-text-muted">
              🔒 Pembayaran aman dengan Midtrans
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-gray-800 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Kembali ke Hasil
          </button>
        </div>
      </div>
    </div>
  );
}