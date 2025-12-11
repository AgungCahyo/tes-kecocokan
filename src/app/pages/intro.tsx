// src/app/pages/intro.tsx
'use client'

import React from 'react';
import { ArrowRight, Heart } from "lucide-react";
import { StepType } from '@/types';

interface IntroProps {
  person1Name: string;
  setPerson1Name: (name: string) => void;
  person2Name: string;
  setPerson2Name: (name: string) => void;
  setStep: (step: StepType) => void;
}

const Intro: React.FC<IntroProps> = ({ 
  person1Name,
  setPerson1Name,
  person2Name,
  setPerson2Name,
  setStep 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          <Heart className="w-20 h-20 mx-auto mb-6 text-pink-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tes Kecocokan Kepribadian
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Temukan seberapa cocok kepribadian kalian dalam hubungan. Tes ini memakan waktu sekitar 10-15 menit per orang.
          </p>

          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Nama Orang Pertama"
              value={person1Name}
              onChange={(e) => setPerson1Name(e.target.value)}
              className="w-full px-6 py-4 border-2 text-black border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
            />
            <input
              type="text"
              placeholder="Nama Orang Kedua"
              value={person2Name}
              onChange={(e) => setPerson2Name(e.target.value)}
              className="w-full px-6 py-4 border-2 text-black border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
            />
          </div>

          <button
            onClick={() => setStep('test')}
            disabled={!person1Name || !person2Name}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Mulai Tes <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;


