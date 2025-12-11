// src/app/person2/page.tsx
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users } from "lucide-react";
import { useTestStore } from '@/lib/store';

export default function Person2Page() {
  const router = useRouter();
  const { person1Name, person2Name } = useTestStore();

  React.useEffect(() => {
    if (!person1Name || !person2Name) {
      router.push('/');
    }
  }, [person1Name, person2Name, router]);

  const handleStart = () => {
    router.push('/test');
  };

  if (!person1Name || !person2Name) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          <Users className="w-20 h-20 mx-auto mb-6 text-purple-500" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Giliran {person2Name}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {person1Name} sudah selesai mengisi tes. Sekarang giliran {person2Name} untuk menjawab pertanyaan yang sama.
          </p>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            Mulai Tes {person2Name} <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}