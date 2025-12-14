// src/app/test/page.tsx - Updated Clean Gen Z Style
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTestStore } from '@/lib/store';
import { questions, scaleOptions, calculatePersonality } from '@/app/data';

export default function TestPage() {
  const router = useRouter();
  const {
    person1Name,
    person2Name,
    currentPerson,
    currentQuestion,
    person1Answers,
    person2Answers,
    setCurrentQuestion,
    setCurrentPerson,
    setPerson1Answer,
    setPerson2Answer,
    setPerson1Profile,
    setPerson2Profile,
  } = useTestStore();

  React.useEffect(() => {
    if (!person1Name || !person2Name) {
      router.push('/');
    }
  }, [person1Name, person2Name, router]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = currentPerson === 1
    ? person1Answers[currentQuestion]
    : person2Answers[currentQuestion];

  const handleAnswer = (value: number) => {
    if (currentPerson === 1) {
      setPerson1Answer(currentQuestion, value);
    } else {
      setPerson2Answer(currentQuestion, value);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentPerson === 1) {
        const profile = calculatePersonality(
          currentQuestion === questions.length - 1
            ? [...person1Answers.slice(0, currentQuestion), value]
            : person1Answers
        );
        setPerson1Profile(profile);
        setCurrentPerson(2);
        setCurrentQuestion(0);
        router.push('/person2');
      } else {
        const profile = calculatePersonality(
          currentQuestion === questions.length - 1
            ? [...person2Answers.slice(0, currentQuestion), value]
            : person2Answers
        );
        setPerson2Profile(profile);
        router.push('/result');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!person1Name || !person2Name) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Progress Header */}
        <div className="glass-panel rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {currentPerson === 1 ? person1Name : person2Name}
                </span>
              </div>
              <p className="text-sm text-text-muted font-medium">
                Pertanyaan {currentQuestion + 1} <span className="text-text-muted/60">dari {questions.length}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Modern Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(225,29,72,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-panel rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center leading-snug">
            {questions[currentQuestion].text}
          </h3>

          {/* Options */}
          <div className="space-y-4">
            {scaleOptions.map((option) => {
              const isSelected = currentAnswer === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-5 rounded-2xl transition-all duration-200 text-left border-2 group ${isSelected
                    ? "border-primary bg-primary-light shadow-md"
                    : "border-transparent bg-secondary hover:bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-lg transition-colors ${isSelected ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                      {option.label}
                    </span>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 group-hover:border-primary/50"
                      }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-4 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          {currentAnswer !== undefined && (
            <button
              onClick={() => handleAnswer(currentAnswer)}
              className="flex-1 py-4 btn-primary text-lg"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Lanjut
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </>
              ) : currentPerson === 1 ? (
                <>
                  Selesai - Giliran {person2Name}
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </>
              ) : (
                <>
                  Lihat Hasil
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}