// src/app/result/page.tsx - Refactored with modular components
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Smile, Heart, Users, RefreshCw, Sparkles } from "lucide-react";
import { useTestStore } from '@/lib/store';
import { getPersonalityDescription, calculateCompatibility } from '@/app/data';
import { CompatibilityScore, PersonalityCard } from '@/components/result';

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

  const person1Info = getPersonalityDescription(person1Profile.type || 'ISFJ');
  const person2Info = getPersonalityDescription(person2Profile.type || 'ISFJ');

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

          {/* Compatibility Score - Using Component */}
          <CompatibilityScore score={compatibility?.overall ?? 0} />

          {/* Premium CTA */}
          <div className="bg-linear-to-r from-primary/5 to-rose-50 border border-primary/20 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                🎁 Bonus: Analisis Mendalam dari AI
              </h3>
              <p className="text-text-muted text-sm">
                Temukan tips komunikasi, cara mengatasi perbedaan, dan strategi memperkuat hubungan kalian!
              </p>
            </div>
            <button
              onClick={handlePremium}
              className="px-6 py-3 btn-primary text-sm whitespace-nowrap"
            >
              Lihat Selengkapnya →
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
                <div key={idx} className="bg-card-bg border md:border-2 border-border rounded-2xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
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

          {/* Individual Personality - Using Component */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Detail Profil
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <PersonalityCard
                name={person1Name}
                profile={person1Profile}
                title={person1Info.title}
                description={person1Info.desc}
              />
              <PersonalityCard
                name={person2Name}
                profile={person2Profile}
                title={person2Info.title}
                description={person2Info.desc}
              />
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