// src/app/pages/PremiumPage.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Send, CheckCircle, XCircle, Loader, CreditCard } from 'lucide-react';
import { TestResult } from '@/types';
import { webhookService } from '@/services/webhookServices';
import { midtransService, MIDTRANS_CONFIG } from '@/services/midtransService';

interface PremiumPageProps {
  result: TestResult;
  person1Answers: number[];
  person2Answers: number[];
  onBack: () => void;
}

declare global {
  interface Window {
    snap: any;
  }
}

const PremiumPage: React.FC<PremiumPageProps> = ({ 
  result, 
  person1Answers, 
  person2Answers, 
  onBack 
}) => {
  const [email, setEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'payment' | 'processing' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // Load Midtrans Snap script
  useEffect(() => {
    const snapScript = document.createElement('script');
    snapScript.src = MIDTRANS_CONFIG.snapUrl;
    snapScript.setAttribute('data-client-key', MIDTRANS_CONFIG.clientKey);
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
      // Create Midtrans transaction
      const paymentResponse = await midtransService.createTransaction(
        email,
        result.person1.name,
        result.person2.name
      );

      if (!paymentResponse.success || !paymentResponse.token) {
        throw new Error(paymentResponse.error || 'Gagal membuat transaksi');
      }

      // Store order ID for later use
      const currentOrderId = `PREMIUM-${Date.now()}`;
      setOrderId(currentOrderId);

      // Open Midtrans Snap
      if (window.snap) {
        window.snap.pay(paymentResponse.token, {
          onSuccess: async (result: any) => {
            console.log('Payment success:', result);
            setCurrentStep('processing');
            await sendAnalysisRequest(currentOrderId);
          },
          onPending: (result: any) => {
            console.log('Payment pending:', result);
            setCurrentStep('error');
            setErrorMessage('Pembayaran masih menunggu. Silakan selesaikan pembayaran Anda.');
          },
          onError: (result: any) => {
            console.log('Payment error:', result);
            setCurrentStep('error');
            setErrorMessage('Terjadi kesalahan saat memproses pembayaran.');
          },
          onClose: () => {
            console.log('Payment popup closed');
            setIsProcessing(false);
            setErrorMessage('Pembayaran dibatalkan');
          }
        });
      } else {
        throw new Error('Midtrans Snap belum dimuat');
      }
    } catch (error) {
      setCurrentStep('error');
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga');
    } finally {
      setIsProcessing(false);
    }
  };

  const sendAnalysisRequest = async (paymentOrderId: string) => {
    try {
      const payload = webhookService.createPayload(
        result.person1.name,
        person1Answers,
        result.person1,
        result.person2.name,
        person2Answers,
        result.person2,
        result.compatibility
      );

      const fullPayload = {
        ...payload,
        email,
        orderId: paymentOrderId,
        requestType: 'premium_analysis',
        paymentStatus: 'success'
      };

      const response = await webhookService.sendToN8N(fullPayload);

      if (response.success) {
        setCurrentStep('success');
      } else {
        setCurrentStep('error');
        setErrorMessage(response.error || 'Gagal mengirim permintaan analisis');
      }
    } catch (error) {
      setCurrentStep('error');
      setErrorMessage('Terjadi kesalahan saat mengirim data');
    }
  };

  const resetForm = () => {
    setCurrentStep('form');
    setErrorMessage('');
    setEmail('');
  };

  return (
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

        {/* Form State */}
        {currentStep === 'form' && (
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
        )}

        {/* Processing State */}
        {currentStep === 'processing' && (
          <div className="space-y-6 mb-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
              <Loader className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-spin" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Memproses Analisis...
              </h3>
              <p className="text-gray-600">
                AI kami sedang menganalisis data kepribadian kalian. Mohon tunggu sebentar.
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {currentStep === 'success' && (
          <div className="space-y-6 mb-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Pembayaran Berhasil!
              </h3>
              <p className="text-gray-600 mb-4">
                Analisis premium sedang diproses dan akan dikirim ke <strong>{email}</strong> dalam 5-10 menit.
              </p>
              <p className="text-sm text-gray-500">
                Order ID: {orderId}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-2">Langkah Selanjutnya:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Cek email Anda (termasuk folder spam)</li>
                <li>✓ Hasil analisis akan dikirim dalam format PDF profesional</li>
                <li>✓ Simpan hasil untuk referensi jangka panjang</li>
              </ul>
            </div>
          </div>
        )}

        {/* Error State */}
        {currentStep === 'error' && (
          <div className="space-y-6 mb-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Terjadi Kesalahan
              </h3>
              <p className="text-gray-600 mb-4">{errorMessage}</p>
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={onBack}
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
  );
};

export default PremiumPage;