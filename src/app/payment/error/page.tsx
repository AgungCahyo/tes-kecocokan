// src/app/payment/error/page.tsx
'use client'

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, Loader, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

function PaymentErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id') || 'N/A';
  const transactionId = searchParams.get('transaction_id') || 'N/A';
  const statusMessage = searchParams.get('status_message') || 'Pembayaran gagal atau dibatalkan';

  const handleTryAgain = () => {
    router.push('/premium');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleBackToResult = () => {
    router.push('/result');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Pembayaran Gagal
          </h1>
          <p className="text-lg text-gray-600">
            Terjadi kesalahan saat memproses pembayaran Anda
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Detail Error
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {statusMessage}
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Order ID:</span>
              <span className="text-right">{orderId}</span>
            </div>
            {transactionId !== 'N/A' && (
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="text-right break-all">{transactionId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Penyebab Umum Pembayaran Gagal
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Saldo tidak mencukupi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Kartu kredit/debit ditolak oleh bank</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Batas transaksi harian terlampaui</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Koneksi internet terputus saat proses pembayaran</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Pembayaran dibatalkan oleh pengguna</span>
            </li>
          </ul>
        </div>

        {/* What to Do */}
        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Apa yang Harus Dilakukan?
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span>Periksa saldo rekening atau limit kartu kredit Anda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span>Pastikan data pembayaran yang dimasukkan benar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span>Coba gunakan metode pembayaran yang berbeda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">4.</span>
              <span>Hubungi bank Anda jika masalah terus berlanjut</span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Coba Lagi
          </button>
          
          <button
            onClick={handleBackToResult}
            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Hasil
          </button>

          <button
            onClick={handleBackToHome}
            className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 Catatan:</span> Tidak ada biaya yang dikenakan untuk transaksi yang gagal. Anda dapat mencoba kembali kapan saja.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              Butuh bantuan lebih lanjut?
            </p>
            <p className="text-sm font-medium text-gray-700">
              Hubungi support kami di <a href="mailto:support@personalitytest.com" className="text-purple-600 hover:underline">support@personalitytest.com</a>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Sertakan Order ID: {orderId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
      </div>
    }>
      <PaymentErrorContent />
    </Suspense>
  );
}