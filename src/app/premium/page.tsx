// src/app/premium/page.tsx (UPDATED with redirect URLs)
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

  const [email, setEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);

  // Redirect if data missing
  useEffect(() => {
    if (!person1Name || !person2Name || !person1Profile || !person2Profile || !compatibility) {
      router.push('/');
    }
  }, [person1Name, person2Name, person1Profile, person2Profile, compatibility, router]);

  // Load Midtrans Snap script
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
    if (!email || !email.includes('@')) {
      setErrorMessage('Mohon masukkan email yang valid');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Store email in localStorage for redirect pages
      localStorage.setItem('payment_email', email);

      const paymentResponse = await midtransService.createTransaction(
        email,
        person1Name,
        person2Name
      );

      if (!paymentResponse.success || !paymentResponse.token) {
        throw new Error(paymentResponse.error || 'Gagal membuat transaksi');
      }

      if (window.snap) {
        // Get current base URL
        const baseUrl = window.location.origin;
        
        window.snap.pay(paymentResponse.token, {
          onSuccess: function(result: any) {
            console.log('Payment success:', result);
            // Redirect to success page with payment details
            const params = new URLSearchParams({
              order_id: result.order_id || '',
              status_code: result.status_code || '200',
              transaction_status: result.transaction_status || 'settlement',
              transaction_id: result.transaction_id || '',
              email: email
            });
            window.location.href = `${baseUrl}/payment/success?${params.toString()}`;
          },
          
          onPending: function(result: any) {
            console.log('Payment pending:', result);
            // Redirect to pending page
            const params = new URLSearchParams({
              order_id: result.order_id || '',
              transaction_id: result.transaction_id || '',
              payment_type: result.payment_type || '',
              email: email
            });
            window.location.href = `${baseUrl}/payment/pending?${params.toString()}`;
          },
          
          onError: function(result: any) {
            console.log('Payment error:', result);
            // Redirect to error page
            const params = new URLSearchParams({
              order_id: result.order_id || '',
              transaction_id: result.transaction_id || '',
              status_message: result.status_message || 'Pembayaran gagal'
            });
            window.location.href = `${baseUrl}/payment/error?${params.toString()}`;
          },
          
          onClose: function() {
            console.log('Payment popup closed');
            setIsProcessing(false);
            setErrorMessage('Pembayaran dibatalkan');
            localStorage.removeItem('payment_email');
          }
        });
      } else {
        throw new Error('Midtrans Snap belum dimuat');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga');
      setIsProcessing(false);
      localStorage.removeItem('payment_email');
    }
  };

  const handleBack = () => {
    router.push('/result');
  };

  if (!person1Name || !person2Name || !person1Profile || !person2Profile || !compatibility) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Analisis Premium AI
            </h1>
            <p className="text-lg text-gray-600">
              Dapatkan analisis mendalam dari AI tentang hubungan kalian
            </p>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
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
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8 text-center">
            <p className="text-gray-600 mb-2">Harga Spesial</p>
            <p className="text-4xl font-bold text-gray-800 mb-1">Rp 14.899</p>
            <p className="text-sm text-gray-500">Sekali bayar, hasil dikirim ke email</p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email untuk menerima hasil analisis
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-gray-800"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <XCircle className="w-5 h-5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isProcessing || !snapLoaded}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Memproses...
                </>
              ) : !snapLoaded ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Memuat sistem pembayaran...
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Bayar & Dapatkan Analisis
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Pembayaran aman dengan Midtrans
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Hasil
          </button>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-2">
              🔒 Pembayaran diproses secara aman oleh Midtrans
            </p>
            <p className="text-xs text-gray-400">
              Data Anda dilindungi dengan enkripsi SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}