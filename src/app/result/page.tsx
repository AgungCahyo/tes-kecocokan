// src/app/result/page.tsx - Updated Clean Gen Z Style
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

  React.useEffect(() => {
    if (person1Profile && person2Profile && !compatibility) {
      const compat = calculateCompatibility(person1Profile, person2Profile);
      setCompatibility(compat);
    }
  }, [person1Profile, person2Profile, compatibility, setCompatibility]);

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
    <div className="min-h-screen bg-bg-alt">
      <div className="max-w-5xl mx-auto p-4 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-border p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-2xl mb-6">
              <TrendingUp className="w-10 h-10 text-primary" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Hasil Kecocokan
            </h1>
            <p className="text-lg text-text-muted">
              Analisis lengkap antara {person1Name} dan {person2Name}
            </p>
          </div>

          {/* Compatibility Score */}
          <div className="bg-primary text-white rounded-3xl p-10 mb-10 shadow-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 opacity-90">
                Skor Kecocokan Keseluruhan
              </h2>
              <p className="text-7xl font-extrabold mb-2">
                {compatibility.overall}%
              </p>
              <p className="text-lg opacity-90">
                Semakin tinggi, semakin besar potensi hubungan harmonis
              </p>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="bg-secondary border-2 border-gray-200 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ingin Analisis Lebih Dalam?
                </h3>
                <p className="text-text-muted mb-4">
                  Dapatkan rekomendasi personalisasi dari AI tentang cara membangun hubungan yang lebih harmonis, strategi komunikasi efektif, dan tips mengatasi perbedaan.
                </p>
                <button
                  onClick={handlePremium}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                  Dapatkan Analisis Premium AI
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {[
              { label: 'Kepribadian', key: 'personality' as const, icon: Smile },
              { label: 'Komunikasi & Konflik', key: 'communication' as const, icon: MessageCircle },
              { label: 'Nilai & Love Language', key: 'values' as const, icon: Heart },
              { label: 'Gaya Hidup', key: 'lifestyle' as const, icon: Users }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border-2 border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{item.label}</h3>
                  </div>
                  <p className="text-4xl font-bold text-primary">
                    {Math.round(compatibility.breakdown[item.key])}%
                  </p>
                </div>
              );
            })}
          </div>

          {/* Individual Personality */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Kepribadian Masing-Masing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { ...person1Profile, name: person1Name },
                { ...person2Profile, name: person2Name }
              ].map((person, idx) => {
                const info = getPersonalityDescription(person.type);
                return (
                  <div key={idx} className="bg-secondary border border-border rounded-2xl p-6 shadow-sm">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {person.name}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light rounded-full">
                        <span className="text-base font-bold text-primary">
                          {person.type}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      {info.title}
                    </p>
                    <p className="text-text-muted mb-4">{info.desc}</p>

                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-border">
                          <p className="text-xs text-text-muted mb-1">Energi</p>
                          <p className="font-semibold text-gray-800">{person.traits.energy}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-border">
                          <p className="text-xs text-text-muted mb-1">Informasi</p>
                          <p className="font-semibold text-gray-800">{person.traits.information}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-border">
                          <p className="text-xs text-text-muted mb-1">Keputusan</p>
                          <p className="font-semibold text-gray-800">{person.traits.decisions}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-border">
                          <p className="text-xs text-text-muted mb-1">Gaya Hidup</p>
                          <p className="font-semibold text-gray-800">{person.traits.lifestyle}</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-text-muted">Komunikasi:</span>
                          <span className="font-medium text-gray-800">{person.commStyle}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-text-muted">Konflik:</span>
                          <span className="font-medium text-gray-800">{person.conflictStyle}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-text-muted">Love Language:</span>
                          <span className="font-medium text-gray-800">{person.loveLanguage}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-text-muted">Nilai Utama:</span>
                          <span className="font-medium text-gray-800">{person.topValue}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-text-muted">Preferensi:</span>
                          <span className="font-medium text-gray-800">{person.lifestylePreference}</span>
                        </div>
                      </div>
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
              className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-gray-800 text-lg font-semibold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
              Ulangi Tes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}