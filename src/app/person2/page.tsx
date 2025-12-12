
// src/app/person2/page.tsx - Updated

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-alt">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-border p-8 md:p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-2xl mb-6">
            <Users className="w-10 h-10 text-primary" strokeWidth={2.5} />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Giliran {person2Name}!
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-md mx-auto">
            {person1Name} sudah selesai mengisi tes. Sekarang giliran {person2Name} untuk menjawab pertanyaan yang sama.
          </p>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-lg font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            Mulai Tes {person2Name} 
            <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}