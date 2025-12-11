// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Heart } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
              value={localPerson1}
              onChange={(e) => setLocalPerson1(e.target.value)}
              className="w-full px-6 py-4 border-2 text-black border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
            />
            <input
              type="text"
              placeholder="Nama Orang Kedua"
              value={localPerson2}
              onChange={(e) => setLocalPerson2(e.target.value)}
              className="w-full px-6 py-4 border-2 text-black border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={!localPerson1 || !localPerson2}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Mulai Tes <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}