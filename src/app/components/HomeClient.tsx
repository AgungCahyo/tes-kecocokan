'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useTestStore } from '@/lib/store';

export default function HomeClient() {
    const router = useRouter();
    const { person1Name, person2Name, setPerson1Name, setPerson2Name, setCurrentQuestion, setCurrentPerson } = useTestStore();

    const [localPerson1, setLocalPerson1] = useState(person1Name);
    const [localPerson2, setLocalPerson2] = useState(person2Name);

    const handleStart = () => {
        if (!localPerson1 || !localPerson2) return;

        setPerson1Name(localPerson1);
        setPerson2Name(localPerson2);
        setCurrentPerson(1);
        setCurrentQuestion(0);

        router.push('/test');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
                {/* Main Card */}
                <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">

                    {/* Decorative Background Blur */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

                    {/* Header */}
                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-2xl mb-6 shadow-sm transform hover:rotate-3 transition-transform duration-300">
                            <Heart className="w-10 h-10 text-primary" strokeWidth={2.5} />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
                            Tes Kecocokan
                        </h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-primary/90 mb-4">
                            Seberapa Cocok Kalian?
                        </h2>

                        <p className="text-text-muted text-lg max-w-sm mx-auto leading-relaxed">
                            Analisis psikologis modern untuk memahami dinamika hubungan kalian secara mendalam.
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-5 mb-10 relative z-10">
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                                Nama Kamu
                            </label>
                            <input
                                type="text"
                                autoCapitalize="words"
                                placeholder="Misal: Andi"
                                value={localPerson1}
                                onChange={(e) => setLocalPerson1(e.target.value)}
                                className="input-modern"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                                Nama Pasangan
                            </label>
                            <input
                                type="text"
                                autoCapitalize="words"
                                placeholder="Misal: Budi"
                                value={localPerson2}
                                onChange={(e) => setLocalPerson2(e.target.value)}
                                className="input-modern"
                            />
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleStart}
                        disabled={!localPerson1 || !localPerson2}
                        className="w-full py-4 btn-primary text-lg shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Mulai Analisis
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </button>

                    {/* Info Badge */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-text-muted bg-secondary/50 py-2 px-4 rounded-full w-fit mx-auto">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-medium">Gratis • Privasi Terjaga • Akurat</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
