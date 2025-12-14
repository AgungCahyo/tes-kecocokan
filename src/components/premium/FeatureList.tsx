'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FeatureListProps {
    features?: string[];
    title?: string;
}

const defaultFeatures = [
    'Analisis mendalam kepribadian masing-masing',
    'Rekomendasi komunikasi yang efektif',
    'Strategi mengatasi perbedaan',
    'Tips membangun hubungan yang harmonis',
    'Prediksi tantangan dan solusinya',
    'Saran personalisasi berdasarkan profil kalian'
];

export function FeatureList({
    features = defaultFeatures,
    title = 'Yang Akan Anda Dapatkan:'
}: FeatureListProps) {
    return (
        <div className="bg-secondary rounded-2xl p-6 mb-8 border border-border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                {title}
            </h2>
            <ul className="space-y-3">
                {features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-gray-700">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeatureList;
