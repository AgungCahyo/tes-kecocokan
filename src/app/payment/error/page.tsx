// src/app/payment/error/page.tsx - Refactored with modular components
'use client'

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { PaymentStatusCard, OrderDetails } from '@/components/payment';
import { LoadingSpinner } from '@/components/ui';

function PaymentErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id') || 'N/A';
  const transactionId = searchParams.get('transaction_id') || 'N/A';
  const statusMessage = searchParams.get('status_message') || 'Pembayaran gagal atau dibatalkan';

  const handleTryAgain = () => {
    router.push('/premium');
  };

  const handleBackToResult = () => {
    router.push('/result');
  };

  const orderDetails = [
    { label: 'Order ID', value: orderId },
    ...(transactionId !== 'N/A' ? [{ label: 'Transaction ID', value: transactionId }] : [])
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt p-4">
      <div className="max-w-2xl w-full bg-card-bg rounded-3xl shadow-lg border border-border p-8 md:p-12">

        {/* Payment Status Header - Using Component */}
        <PaymentStatusCard
          icon={XCircle}
          variant="error"
          title="Pembayaran Gagal"
          subtitle="Terjadi kesalahan saat memproses pembayaran"
        />

        {/* Error Details */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Detail Error
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {statusMessage}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            {orderDetails.map((detail, idx) => (
              <div key={idx} className={`flex justify-between py-2 ${idx < orderDetails.length - 1 ? 'border-b border-red-200' : ''}`}>
                <span className="font-medium">{detail.label}:</span>
                <span className="text-right break-all text-xs">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Penyebab Umum Pembayaran Gagal
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Saldo tidak mencukupi',
              'Kartu kredit/debit ditolak oleh bank',
              'Batas transaksi harian terlampaui',
              'Koneksi internet terputus',
              'Pembayaran dibatalkan oleh pengguna'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
            Coba Lagi
          </button>

          <button
            onClick={handleBackToResult}
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-gray-800 font-semibold rounded-xl transition-all duration-200"
          >
            Kembali ke Hasil
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 Catatan:</span> Tidak ada biaya dikenakan untuk transaksi gagal.
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-text-muted mb-2">Butuh bantuan?</p>
            <p className="text-sm font-medium text-gray-700">
              Email: <a href="mailto:support@personalitytest.com" className="text-primary hover:underline">support@personalitytest.com</a>
            </p>
            <p className="text-xs text-text-muted mt-2">Order ID: {orderId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <PaymentErrorContent />
    </Suspense>
  );
}