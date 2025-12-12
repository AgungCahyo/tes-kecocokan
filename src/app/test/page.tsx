// src/app/test/page.tsx - Updated Clean Gen Z Style
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
    <div className="min-h-screen bg-bg-alt">
      <div className="max-w-3xl mx-auto p-4 py-8">
        
        {/* Progress Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {currentPerson === 1 ? person1Name : person2Name}
                </span>
              </div>
              <p className="text-sm text-text-muted">
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center leading-relaxed">
            {questions[currentQuestion].text}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {scaleOptions.map((option) => {
              const isSelected = currentAnswer === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-primary/50 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                      {option.label}
                    </span>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-secondary hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Kembali
          </button>

          {currentAnswer !== undefined && (
            <button
              onClick={() => handleAnswer(currentAnswer)}
              className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
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