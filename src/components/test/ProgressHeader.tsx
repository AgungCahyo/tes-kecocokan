'use client';

import React from 'react';

interface ProgressHeaderProps {
    currentPersonName: string;
    currentQuestion: number;
    totalQuestions: number;
}

export function ProgressHeader({
    currentPersonName,
    currentQuestion,
    totalQuestions
}: ProgressHeaderProps) {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="glass-panel rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                            {currentPersonName}
                        </span>
                    </div>
                    <p className="text-sm text-text-muted font-medium">
                        Pertanyaan {currentQuestion + 1} <span className="text-text-muted/60">dari {totalQuestions}</span>
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                        {Math.round(progress)}%
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary rounded-full h-2">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(225,29,72,0.4)]"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default ProgressHeader;
