// src/app/test/page.tsx
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTestStore } from '@/lib/store';
import { questions, scaleOptions, calculatePersonality } from '@/app/data/questions';

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

  // Redirect jika nama belum diisi
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
      // Last question
      if (currentPerson === 1) {
        // Person 1 selesai, pindah ke person 2
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
        // Person 2 selesai, hitung hasil
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
    return null; // atau loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentPerson === 1 ? person1Name : person2Name}
              </h2>
              <p className="text-gray-600">
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </p>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center leading-relaxed">
            {questions[currentQuestion].text}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {scaleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  currentAnswer === option.value
                    ? "border-purple-500 bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">
                    {option.label}
                  </span>

                  {currentAnswer === option.value && (
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali
          </button>

          {currentAnswer !== undefined && (
            <button
              onClick={() => handleAnswer(currentAnswer)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              {currentQuestion < questions.length - 1 ? (
                <>Lanjut <ArrowRight className="w-5 h-5" /></>
              ) : currentPerson === 1 ? (
                <>Selesai - Giliran {person2Name} <ArrowRight className="w-5 h-5" /></>
              ) : (
                <>Lihat Hasil <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}