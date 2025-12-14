'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { IconBadge } from '../ui';

interface PaymentStatusCardProps {
    icon: LucideIcon;
    variant: 'success' | 'warning' | 'error';
    title: string;
    subtitle: string;
}

export function PaymentStatusCard({
    icon: Icon,
    variant,
    title,
    subtitle
}: PaymentStatusCardProps) {
    return (
        <div className="text-center mb-8">
            <IconBadge variant={variant} size="lg" className="mb-6">
                <Icon className="w-12 h-12" strokeWidth={2.5} />
            </IconBadge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {title}
            </h1>
            <p className="text-lg text-text-muted">
                {subtitle}
            </p>
        </div>
    );
}

export default PaymentStatusCard;
