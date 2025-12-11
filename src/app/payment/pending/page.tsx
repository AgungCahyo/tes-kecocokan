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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
            <Clock className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Pembayaran Pending
          </h1>
          <p className="text-lg text-gray-600">
            Pembayaran Anda sedang dalam proses
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Detail Pesanan
          </h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Order ID:</span>
              <span className="text-right">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span className="text-right break-all">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Metode Pembayaran:</span>
              <span className="text-right capitalize">{paymentType.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span className="text-right font-bold text-yellow-600">Menunggu Pembayaran</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Instruksi Pembayaran
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>Selesaikan pembayaran sesuai instruksi yang diberikan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>Pembayaran akan otomatis terverifikasi setelah selesai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">3.</span>
                  <span>Analisis premium akan diproses setelah pembayaran terkonfirmasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">4.</span>
                  <span>Anda akan menerima email konfirmasi setelah pembayaran berhasil</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods Info */}
        {paymentType === 'bank_transfer' && (
          <div className="bg-purple-50 rounded-xl p-4 mb-8">
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">ℹ️ Transfer Bank:</p>
              <p>Pembayaran akan terkonfirmasi otomatis dalam 1-3 jam kerja setelah transfer diterima. Silakan simpan bukti transfer Anda.</p>
            </div>
          </div>
        )}

        {paymentType === 'echannel' && (
          <div className="bg-purple-50 rounded-xl p-4 mb-8">
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">ℹ️ Mandiri Bill Payment:</p>
              <p>Gunakan kode pembayaran yang diberikan untuk melakukan pembayaran melalui ATM, Internet Banking, atau Mobile Banking Mandiri.</p>
            </div>
          </div>
        )}

        {paymentType === 'qris' && (
          <div className="bg-purple-50 rounded-xl p-4 mb-8">
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">ℹ️ QRIS:</p>
              <p>Scan QR code yang ditampilkan menggunakan aplikasi e-wallet atau mobile banking Anda untuk menyelesaikan pembayaran.</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCheckStatus}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Cek Status Pembayaran
          </button>
          
          <button
            onClick={handleBackToPremium}
            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
          >
            Kembali ke Premium
          </button>

          <button
            onClick={handleBackToHome}
            className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 mb-2">
            Jangan tutup halaman ini jika Anda masih dalam proses pembayaran
          </p>
          <p className="text-xs text-gray-500">
            Butuh bantuan? Hubungi kami di support@personalitytest.com
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