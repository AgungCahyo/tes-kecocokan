'use client';

import React from 'react';

interface OrderDetail {
    label: string;
    value: string;
    highlight?: boolean;
}

interface OrderDetailsProps {
    details: OrderDetail[];
    variant?: 'success' | 'warning' | 'error';
}

export function OrderDetails({
    details,
    variant = 'success'
}: OrderDetailsProps) {
    const variantClasses = {
        success: 'bg-green-50 border-green-200',
        warning: 'bg-yellow-50 border-yellow-300',
        error: 'bg-red-50 border-red-200'
    }[variant];

    const borderColor = {
        success: 'border-green-200',
        warning: 'border-yellow-200',
        error: 'border-red-200'
    }[variant];

    const highlightColor = {
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600'
    }[variant];

    return (
        <div className={`${variantClasses} border-2 rounded-2xl p-6 mb-8`}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Detail Pesanan
            </h2>
            <div className="space-y-2 text-gray-700">
                {details.map((detail, idx) => (
                    <div key={idx} className={`flex justify-between py-2 ${idx < details.length - 1 ? `border-b ${borderColor}` : ''}`}>
                        <span className="font-medium">{detail.label}:</span>
                        <span className={`text-right ${detail.highlight ? `font-bold ${highlightColor}` : ''}`}>
                            {detail.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderDetails;
