'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { IconBadge } from '../ui';

interface PremiumHeaderProps {
    title?: string;
    subtitle?: string;
}

export function PremiumHeader({
    title = 'Analisis Premium AI',
    subtitle = 'Dapatkan insight mendalam dari AI tentang hubungan kalian'
}: PremiumHeaderProps) {
    return (
        <div className="text-center mb-8">
            <IconBadge variant="primary" size="md" className="mb-4">
                <Sparkles className="w-8 h-8" strokeWidth={2.5} />
            </IconBadge>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {title}
            </h1>
            <p className="text-lg text-text-muted">
                {subtitle}
            </p>
        </div>
    );
}

export default PremiumHeader;
