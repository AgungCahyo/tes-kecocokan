'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
    nextLabel: string;
    showNext?: boolean;
}

export function NavigationButtons({
    canGoBack,
    canGoNext,
    onBack,
    onNext,
    nextLabel,
    showNext = true
}: NavigationButtonsProps) {
    return (
        <div className="flex gap-4">
            <button
                onClick={onBack}
                disabled={!canGoBack}
                className="px-6 py-4 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                <span className="hidden sm:inline">Kembali</span>
            </button>

            {showNext && canGoNext && (
                <button
                    onClick={onNext}
                    className="flex-1 py-4 btn-primary text-lg"
                >
                    {nextLabel}
                    <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
            )}
        </div>
    );
}

export default NavigationButtons;
