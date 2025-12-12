// src/app/page.tsx - Updated Clean Gen Z Style
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useTestStore } from '@/lib/store';

export default function HomePage() {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-alt">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-border p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-2xl mb-6">
              <Heart className="w-10 h-10 text-primary" strokeWidth={2.5} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Tes Kecocokan
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
              Kepribadian
            </h2>
            
            <p className="text-gray-400 text-text-muted max-w-md mx-auto">
              Temukan seberapa cocok kepribadian kalian dalam hubungan. Hanya butuh 10-15 menit per orang.
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Orang Pertama
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                value={localPerson1}
                onChange={(e) => setLocalPerson1(e.target.value)}
                className="w-full px-5 py-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-gray-900 text-base transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Orang Kedua
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                value={localPerson2}
                onChange={(e) => setLocalPerson2(e.target.value)}
                className="w-full px-5 py-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-gray-900 text-base transition-colors"
              />
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleStart}
            disabled={!localPerson1 || !localPerson2}
            className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            Mulai Tes 
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>

          {/* Info Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary">
            <Sparkles className="w-4 h-4" />
            <span>40 pertanyaan untuk hasil akurat</span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-primary">
            Gratis • Tanpa login • Hasil langsung
          </p>
        </div>
      </div>
    </div>
  );
}