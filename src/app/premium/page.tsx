// src/app/premium/page.tsx - Refactored with modular components
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Loader } from 'lucide-react';
import { useTestStore } from '@/lib/store';
import { midtransService, MIDTRANS_CONFIG } from '@/services/midtransService';
import {
  PremiumHeader,
  FeatureList,
  TestimonialSection,
  PricingCard,
  WhatsAppVerification
} from '@/components/premium';

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
    person1Profile,
    person2Profile,
    compatibility,
  } = useTestStore();

  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
  const [isWaVerified, setIsWaVerified] = useState<boolean>(false);

  // Redirect if no data
  useEffect(() => {
    if (!person1Name || !person2Name || !person1Profile || !person2Profile || !compatibility) {
      router.push('/');
    }
  }, [person1Name, person2Name, person1Profile, person2Profile, compatibility, router]);

  // Load Midtrans Snap
  useEffect(() => {
    if (typeof window !== 'undefined' && window.snap) {
      setSnapLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${MIDTRANS_CONFIG.snapUrl}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.snap) {
        setSnapLoaded(true);
      } else {
        existingScript.addEventListener('load', () => setSnapLoaded(true));
      }
      return;
    }

    const snapScript = document.createElement('script');
    snapScript.src = MIDTRANS_CONFIG.snapUrl || '';
    snapScript.setAttribute('data-client-key', MIDTRANS_CONFIG.clientKey || '');
    snapScript.onload = () => setSnapLoaded(true);
    snapScript.onerror = () => console.error('Failed to load Midtrans Snap');
    document.body.appendChild(snapScript);
  }, []);

  const handlePayment = async () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (!cleanNumber || cleanNumber.length < 10) {
      setErrorMessage('Mohon masukkan nomor WhatsApp yang valid');
      return;
    }

    if (!isWaVerified) {
      setErrorMessage('Mohon verifikasi WhatsApp terlebih dahulu dengan mengirim START ke bot');
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
        <div className="bg-card-bg rounded-3xl shadow-lg border border-border p-8 md:p-12">

          {/* Header */}
          <PremiumHeader />

          {/* Features */}
          <FeatureList />

          {/* Testimonials */}
          <TestimonialSection />

          {/* Pricing */}
          <PricingCard />

          {/* WhatsApp Verification & Payment */}
          <div className="space-y-4 mb-6">
            <WhatsAppVerification
              whatsappNumber={whatsappNumber}
              onNumberChange={setWhatsappNumber}
              isVerified={isWaVerified}
              onVerified={() => setIsWaVerified(true)}
            />

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 text-primary bg-primary-light p-3 rounded-xl border border-primary">
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Payment Button - Only show when verified */}
            {isWaVerified && (
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
            )}

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