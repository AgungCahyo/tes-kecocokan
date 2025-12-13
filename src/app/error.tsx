'use client';

import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-alt p-4">
            <div className="max-w-md w-full bg-card-bg rounded-3xl shadow-lg border border-border p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={2.5} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Terjadi Kesalahan
                </h1>

                <p className="text-text-muted mb-6">
                    Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
                </p>

                {process.env.NODE_ENV === 'development' && error?.message && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
                        <p className="text-xs font-mono text-red-600 break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs font-mono text-red-400 mt-1">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={reset}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
                        Coba Lagi
                    </button>

                    <a
                        href="/"
                        className="w-full py-3 bg-secondary hover:bg-secondary-dark text-gray-800 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" strokeWidth={2.5} />
                        Kembali ke Beranda
                    </a>
                </div>

                <p className="text-xs text-text-muted mt-6">
                    Jika masalah berlanjut, hubungi support.
                </p>
            </div>
        </div>
    );
}
