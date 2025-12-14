'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface CompatibilityScoreProps {
    score: number;
}

export function CompatibilityScore({ score }: CompatibilityScoreProps) {
    return (
        <div className="bg-gradient-to-br from-primary to-rose-700 text-white rounded-3xl p-10 mb-12 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10 text-center">
                <h2 className="text-xl font-medium mb-6 opacity-90 uppercase tracking-widest text-white/80">
                    Tingkat Kecocokan
                </h2>
                <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-8xl md:text-9xl font-black tracking-tighter drop-shadow-sm">
                        {score}
                    </span>
                    <span className="text-4xl md:text-5xl font-bold opacity-80 mt-8">%</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold">Potensi Hubungan Harmonis</span>
                </div>
            </div>
        </div>
    );
}

export default CompatibilityScore;
