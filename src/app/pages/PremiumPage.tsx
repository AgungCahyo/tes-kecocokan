// src/app/pages/PremiumPage.tsx
'use client'

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Send, CheckCircle, XCircle, Loader } from 'lucide-react';
import { TestResult } from '@/types';
import { webhookService } from '@/services/webhookServices';

interface PremiumPageProps {
  result: TestResult;
  person1Answers: number[];
  person2Answers: number[];
  onBack: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({ 
  result, 
  person1Answers, 
  person2Answers, 
  onBack 
}) => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<any>(null);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setErrorMessage('Mohon masukkan email yang valid');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

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

      // Tambahkan email ke payload
      const fullPayload = {
        ...payload,
        email,
        requestType: 'premium_analysis'
      };

      const response = await webhookService.sendToN8N(fullPayload);

      if (response.success) {
        setSubmitStatus('success');
        setAiResponse(response.data);
      } else {
        setSubmitStatus('error');
        setErrorMessage(response.error || 'Terjadi kesalahan saat mengirim data');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Terjadi kesalahan tidak terduga');
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Email Form */}
        {submitStatus === 'idle' && (
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
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Kirim untuk Analisis AI
                </>
              )}
            </button>
          </div>
        )}

        {/* Success State */}
        {submitStatus === 'success' && (
          <div className="space-y-6 mb-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Berhasil Dikirim!
              </h3>
              <p className="text-gray-600">
                Analisis AI sedang diproses. Hasil akan dikirim ke email <strong>{email}</strong> dalam beberapa menit.
              </p>
            </div>

            {aiResponse && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Preview Analisis:
                </h3>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(aiResponse, null, 2)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center mb-6">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => {
                setSubmitStatus('idle');
                setErrorMessage('');
              }}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
            >
              Coba Lagi
            </button>
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

        {/* Pricing Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Analisis Premium • Gratis untuk 100 pengguna pertama</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;