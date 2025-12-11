// src/app/result/page.tsx
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Smile, TrendingUp, Users, RefreshCw, Sparkles } from "lucide-react";
import { useTestStore } from '@/lib/store';
import { getPersonalityDescription, calculateCompatibility } from '@/app/data/questions';

export default function ResultPage() {
  const router = useRouter();
  const {
    person1Name,
    person2Name,
    person1Profile,
    person2Profile,
    compatibility,
    setCompatibility,
    resetTest,
  } = useTestStore();

  // Calculate compatibility if not already done
  React.useEffect(() => {
    if (person1Profile && person2Profile && !compatibility) {
      const compat = calculateCompatibility(person1Profile, person2Profile);
      setCompatibility(compat);
    }
  }, [person1Profile, person2Profile, compatibility, setCompatibility]);

  // Redirect if data missing
  React.useEffect(() => {
    if (!person1Name || !person2Name || !person1Profile || !person2Profile) {
      router.push('/');
    }
  }, [person1Name, person2Name, person1Profile, person2Profile, router]);

  if (!person1Name || !person2Name || !person1Profile || !person2Profile || !compatibility) {
    return null;
  }

  const handleReset = () => {
    resetTest();
    router.push('/');
  };

  const handlePremium = () => {
    router.push('/premium');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-12">
            <TrendingUp className="w-20 h-20 mx-auto mb-6 text-purple-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hasil Kecocokan
            </h1>
            <p className="text-lg text-gray-600">
              Analisis lengkap kecocokan antara {person1Name} dan {person2Name}
            </p>
          </div>

          {/* Compatibility Score */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-10 mb-10 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Skor Kecocokan Keseluruhan</h2>
              <p className="text-7xl font-extrabold mb-2">
                {compatibility.overall}%
              </p>
              <p className="text-lg opacity-90">
                Semakin tinggi, semakin besar potensi hubungan yang harmonis
              </p>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <Sparkles className="w-12 h-12 text-yellow-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ingin Analisis Lebih Dalam?
                </h3>
                <p className="text-gray-600 mb-4">
                  Dapatkan rekomendasi personalisasi dari AI tentang cara membangun hubungan yang lebih harmonis, strategi komunikasi efektif, dan tips mengatasi perbedaan.
                </p>
                <button
                  onClick={handlePremium}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Dapatkan Analisis Premium AI
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { label: 'Kepribadian', key: 'personality' as const, icon: Smile },
              { label: 'Komunikasi & Konflik', key: 'communication' as const, icon: MessageCircle },
              { label: 'Nilai & Love Language', key: 'values' as const, icon: Heart },
              { label: 'Gaya Hidup', key: 'lifestyle' as const, icon: Users }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-purple-500" />
                    <h3 className="text-xl font-bold text-gray-800">{item.label}</h3>
                  </div>
                  <p className="text-4xl font-bold text-purple-600">
                    {Math.round(compatibility.breakdown[item.key])}%
                  </p>
                </div>
              );
            })}
          </div>

          {/* Individual Personality */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
              Kepribadian Masing-Masing
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { ...person1Profile, name: person1Name },
                { ...person2Profile, name: person2Name }
              ].map((person, idx) => {
                const info = getPersonalityDescription(person.type);
                return (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {person.name}
                    </h3>
                    <p className="text-xl font-semibold text-purple-600 mb-4">
                      {person.type} — {info.title}
                    </p>
                    <p className="text-gray-700 mb-4">{info.desc}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <p><span className="font-semibold">Energi:</span> {person.traits.energy}</p>
                        <p><span className="font-semibold">Informasi:</span> {person.traits.information}</p>
                      </div>
                      <div>
                        <p><span className="font-semibold">Keputusan:</span> {person.traits.decisions}</p>
                        <p><span className="font-semibold">Gaya Hidup:</span> {person.traits.lifestyle}</p>
                      </div>
                    </div>

                    <div className="mt-4 text-sm">
                      <p><span className="font-semibold">Gaya Komunikasi:</span> {person.commStyle}</p>
                      <p><span className="font-semibold">Penyelesaian Konflik:</span> {person.conflictStyle}</p>
                      <p><span className="font-semibold">Love Language:</span> {person.loveLanguage}</p>
                      <p><span className="font-semibold">Nilai Utama:</span> {person.topValue}</p>
                      <p><span className="font-semibold">Preferensi Hidup:</span> {person.lifestylePreference}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl shadow hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-6 h-6" />
              Ulangi Tes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}