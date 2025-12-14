'use client';

import React from 'react';

interface PricingCardProps {
    originalPrice?: string;
    discountedPrice?: string;
    discountPercent?: string;
    description?: string;
}

export function PricingCard({
    originalPrice = 'Rp 29.000',
    discountedPrice = 'Rp 14.899',
    discountPercent = '49%',
    description = 'Sekali bayar • Hasil dikirim ke WhatsApp'
}: PricingCardProps) {
    return (
        <div className="bg-primary-light border-2 border-primary rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute -top-1 -right-1">
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg animate-pulse">
                    HEMAT {discountPercent}
                </div>
            </div>

            <p className="text-text-muted mb-3 font-medium">Harga Spesial Hari Ini</p>

            {/* Original Price (Strikethrough) */}
            <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl text-gray-400 line-through decoration-2">{originalPrice}</span>
            </div>

            {/* Discounted Price */}
            <p className="text-5xl font-bold text-primary mb-2">{discountedPrice}</p>

            <p className="text-sm text-text-muted">{description}</p>

            {/* Urgency Indicator */}
            <div className="mt-3 inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
                23 orang membeli dalam 1 jam terakhir
            </div>
        </div>
    );
}

export default PricingCard;
