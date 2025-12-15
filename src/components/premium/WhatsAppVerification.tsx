'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Loader, Check } from 'lucide-react';

interface WhatsAppVerificationProps {
    whatsappNumber: string;
    onNumberChange: (value: string) => void;
    isVerified: boolean;
    onVerified: () => void;
    botNumber?: string;
}

export function WhatsAppVerification({
    whatsappNumber,
    onNumberChange,
    isVerified,
    onVerified,
    botNumber = '6281392290571'
}: WhatsAppVerificationProps) {
    const [isPolling, setIsPolling] = useState(false);
    const [pollCount, setPollCount] = useState(0);
    const [hasClickedWA, setHasClickedWA] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const cleanNumber = whatsappNumber.replace(/\D/g, '');

    useEffect(() => {
        if (isVerified || !isPolling) {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
            return;
        }

        if (cleanNumber.length < 10) {
            setIsPolling(false);
            return;
        }

        pollingIntervalRef.current = setInterval(async () => {
            try {
                const response = await fetch(`/api/wa/check?phone=${cleanNumber}`, {
                    method: 'GET',
                    headers: { 'Cache-Control': 'no-cache' },
                });

                if (!response.ok) return;

                const data = await response.json();

                if (data.verified) {
                    onVerified();
                    setIsPolling(false);
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                    return;
                }

                setPollCount(prev => {
                    const newCount = prev + 1;
                    if (newCount >= 30) {
                        setIsPolling(false);
                        setErrorMessage('Verifikasi timeout. Pastikan Anda sudah mengirim START ke WhatsApp bot.');
                        if (pollingIntervalRef.current) {
                            clearInterval(pollingIntervalRef.current);
                            pollingIntervalRef.current = null;
                        }
                        return 0;
                    }
                    return newCount;
                });
            } catch (e) {
                console.error('Polling error:', e);
            }
        }, 2000);

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
    }, [isPolling, isVerified, cleanNumber, onVerified]);

    const handleWAButtonClick = () => {
        if (cleanNumber.length < 10) {
            setErrorMessage('Masukkan nomor WhatsApp terlebih dahulu');
            return;
        }

        setHasClickedWA(true);
        setErrorMessage('');
        setIsPolling(true);
        setPollCount(0);

        const waUrl = `https://wa.me/${botNumber}?text=START`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
    };

    const handleRetryVerification = () => {
        setIsPolling(true);
        setPollCount(0);
        setErrorMessage('');
    };

    if (isVerified) {
        return (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <Check className="w-6 h-6 text-green-600" strokeWidth={2.5} />
                <div>
                    <p className="font-semibold text-green-800">WhatsApp Terverifikasi!</p>
                    <p className="text-sm text-green-600">Nomor: {whatsappNumber}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Input */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Nomor WhatsApp untuk menerima hasil analisis
                </label>
                <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        onNumberChange(val);
                        setHasClickedWA(false);
                        setIsPolling(false);
                        setPollCount(0);
                    }}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-gray-900 transition-colors"
                />
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="flex items-center gap-2 text-primary bg-primary-light p-3 rounded-xl border border-primary">
                    <span className="text-sm font-medium">{errorMessage}</span>
                </div>
            )}

            {/* Verification Box */}
            <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2">
                    Langkah 1: Verifikasi WhatsApp
                </h3>

                {/* Check if already verified button */}
                <button
                    onClick={async () => {
                        if (cleanNumber.length < 10) {
                            setErrorMessage('Masukkan nomor WhatsApp terlebih dahulu');
                            return;
                        }
                        setErrorMessage('');
                        setIsPolling(true);
                        setPollCount(0);
                        try {
                            const response = await fetch(`/api/wa/check?phone=${cleanNumber}`);
                            const data = await response.json();
                            if (data.verified || data.exists) {
                                onVerified();
                            } else {
                                setIsPolling(false);
                                setErrorMessage('Nomor belum terverifikasi. Silakan kirim START ke bot WhatsApp.');
                            }
                        } catch {
                            setIsPolling(false);
                            setErrorMessage('Gagal mengecek status. Coba lagi.');
                        }
                    }}
                    disabled={cleanNumber.length < 10 || isPolling}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    {isPolling ? (
                        <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Mengecek...
                        </>
                    ) : (
                        <>
                            <Check className="w-5 h-5" />
                            Cek Nomor Saya (Sudah Pernah Verifikasi?)
                        </>
                    )}
                </button>

                <div className="relative flex items-center justify-center my-2">
                    <div className="border-t border-blue-300 flex-grow"></div>
                    <span className="px-3 text-sm text-blue-600 font-medium">atau</span>
                    <div className="border-t border-blue-300 flex-grow"></div>
                </div>

                <button
                    onClick={handleWAButtonClick}
                    disabled={cleanNumber.length < 10}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <MessageCircle className="w-5 h-5" />
                    Verifikasi Baru - Kirim START ke Bot
                </button>

                {isPolling && (
                    <div className="space-y-2">
                        <div className="w-full py-3 bg-yellow-50 border-2 border-yellow-400 text-yellow-700 font-semibold rounded-xl flex items-center justify-center gap-2">
                            <Loader className="w-5 h-5 animate-spin" />
                            Menunggu verifikasi... ({pollCount}/30)
                        </div>
                        <button
                            onClick={handleRetryVerification}
                            className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Coba cek lagi
                        </button>
                    </div>
                )}

                {hasClickedWA && !isPolling && (
                    <button
                        onClick={handleRetryVerification}
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        Sudah Kirim START? Klik untuk Verifikasi
                    </button>
                )}

                <p className="text-xs text-blue-600 mt-2 text-center">
                    *Wajib kirim START agar hasil bisa kami kirimkan ke WhatsApp Anda
                </p>
            </div>
        </div>
    );
}

export default WhatsAppVerification;
