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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border-0 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Hasil Analisis Kecocokan
            </h1>
            <p className="text-lg text-text-muted">
              Laporan lengkap untuk <span className="font-semibold text-primary">{person1Name}</span> & <span className="font-semibold text-primary">{person2Name}</span>
            </p>
          </div>

          {/* Compatibility Score - Hero Card */}
          <div className="bg-gradient-to-br from-primary to-rose-700 text-white rounded-3xl p-10 mb-12 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10 text-center">
              <h2 className="text-xl font-medium mb-6 opacity-90 uppercase tracking-widest text-white/80">
                Tingkat Kecocokan
              </h2>
              <div className="flex items-center justify-center gap-1 mb-4">
                <span className="text-8xl md:text-9xl font-black tracking-tighter drop-shadow-sm">
                  {compatibility?.overall ?? 0}
                </span>
                <span className="text-4xl md:text-5xl font-bold opacity-80 mt-8">%</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold">Potensi Hubungan Harmonis</span>
              </div>
            </div>
          </div>

          {/* Premium CTA - Subtle */}
          <div className="bg-gradient-to-r from-gray-50 to-white border border-border rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Ingin Analisis Lebih Dalam?
              </h3>
              <p className="text-text-muted text-sm">
                Dapatkan rekomendasi personalisasi AI tentang strategi komunikasi dan cara mengatasi perbedaan.
              </p>
            </div>
            <button
              onClick={handlePremium}
              className="px-6 py-3 btn-primary text-sm whitespace-nowrap"
            >
              Unlock Premium Report
            </button>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Kepribadian', key: 'personality' as const, icon: Smile },
              { label: 'Komunikasi', key: 'communication' as const, icon: MessageCircle },
              { label: 'Values', key: 'values' as const, icon: Heart },
              { label: 'Gaya Hidup', key: 'lifestyle' as const, icon: Users }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border md:border-2 border-border rounded-2xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-10 h-10 mx-auto bg-primary-light rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">{item.label}</h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {Math.round(compatibility?.breakdown[item.key] ?? 0)}%
                  </p>
                </div>
              );
            })}
          </div>

          {/* Individual Personality */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Detail Profil
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { ...person1Profile, name: person1Name },
                { ...person2Profile, name: person2Name }
              ].map((person, idx) => {
                const info = getPersonalityDescription(person.type || 'ISFJ');
                return (
                  <div key={idx} className="bg-secondary/30 rounded-3xl p-6 md:p-8 border border-border/50">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {person.name}
                        </h3>
                        <span className="text-primary font-bold bg-primary-light px-3 py-1 rounded-full text-sm">
                          {person.type}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {info.title}
                      </p>
                      <p className="text-text-muted text-sm leading-relaxed">{info.desc}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-semibold">Energi</p>
                          <p className="font-semibold text-gray-800 text-sm">{person.traits?.energy ?? '-'}</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-semibold">Keputusan</p>
                          <p className="font-semibold text-gray-800 text-sm">{person.traits?.decisions ?? '-'}</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                          <span className="text-text-muted">Komunikasi</span>
                          <span className="font-medium text-gray-900">{person.commStyle}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                          <span className="text-text-muted">Love Language</span>
                          <span className="font-medium text-gray-900">{person.loveLanguage}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-text-muted">Nilai Utama</span>
                          <span className="font-medium text-gray-900">{person.topValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center pt-8 border-t border-border">
            <button
              onClick={handleReset}
              className="px-8 py-3 btn-secondary mx-auto group hover:bg-gray-200"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" strokeWidth={2.5} />
              Mulai Tes Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}