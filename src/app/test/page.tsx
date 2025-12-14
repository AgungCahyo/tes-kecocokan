// src/app/test/page.tsx - Refactored with modular components
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/lib/store';
import { questions, scaleOptions, calculatePersonality } from '@/app/data';
import { ProgressHeader, QuestionCard, NavigationButtons } from '@/components/test';

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

  const getNextLabel = () => {
    if (currentQuestion < questions.length - 1) {
      return 'Lanjut';
    }
    if (currentPerson === 1) {
      return `Selesai - Giliran ${person2Name}`;
    }
    return 'Lihat Hasil';
  };

  if (!person1Name || !person2Name) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <ProgressHeader
          currentPersonName={currentPerson === 1 ? person1Name : person2Name}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
        />

        {/* Question Card */}
        <QuestionCard
          questionText={questions[currentQuestion].text}
          options={scaleOptions}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswer}
        />

        {/* Navigation */}
        <NavigationButtons
          canGoBack={currentQuestion > 0}
          canGoNext={currentAnswer !== undefined}
          onBack={handlePrevious}
          onNext={() => handleAnswer(currentAnswer!)}
          nextLabel={getNextLabel()}
          showNext={currentAnswer !== undefined}
        />
      </div>
    </div>
  );
}