// src/app/payment/pending/page.tsx
'use client'

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Clock, Loader, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';

function PaymentPendingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id') || 'N/A';
  const transactionId = searchParams.get('transaction_id') || 'N/A';
  const paymentType = searchParams.get('payment_type') || 'unknown';

  const handleCheckStatus = () => {
    // Redirect to check payment status
    window.location.reload();
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleBackToPremium = () => {
    router.push('/premium');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-border p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-50 rounded-2xl mb-6">
            <Clock className="w-12 h-12 text-yellow-500" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Pembayaran Pending
          </h1>
          <p className="text-lg text-text-muted">
            Pembayaran sedang dalam proses
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Detail Pesanan
          </h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between py-2 border-b border-yellow-200">
              <span className="font-medium">Order ID:</span>
              <span className="text-right">{orderId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-yellow-200">
              <span className="font-medium">Transaction ID:</span>
              <span className="text-right break-all text-sm">{transactionId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-yellow-200">
              <span className="font-medium">Metode:</span>
              <span className="text-right capitalize">{paymentType.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Status:</span>
              <span className="text-right font-bold text-yellow-600">Menunggu Pembayaran</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Instruksi Pembayaran
              </h3>
              <ol className="space-y-2 text-sm text-gray-700">
                {[
                  'Selesaikan pembayaran sesuai instruksi',
                  'Pembayaran otomatis terverifikasi setelah selesai',
                  'Analisis premium diproses setelah konfirmasi',
                  'Pesan konfirmasi WhatsApp akan dikirim setelah berhasil'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCheckStatus}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
            Cek Status Pembayaran
          </button>

          <button
            onClick={handleBackToPremium}
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-gray-800 font-semibold rounded-xl transition-all duration-200"
          >
            Kembali ke Premium
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            Jangan tutup halaman jika masih dalam proses pembayaran
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
      </div>
    }>
      <PaymentPendingContent />
    </Suspense>
  );
}