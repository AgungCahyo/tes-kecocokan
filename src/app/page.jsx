'use client'

import React, { useState } from 'react';
import { questions, getPersonalityDescription, calculatePersonality, calculateCompatibility } from './data/questions';
import Intro from './pages/intro';
import Person2 from './pages/person2';
import QuestionsPage from './pages/QuestionPage';
import Result from './pages/ResultPage';

const PersonalityCompatibilityTest = () => {
  const [step, setStep] = useState('intro');
  const [currentPerson, setCurrentPerson] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [person1Answers, setPerson1Answers] = useState([]);
  const [person2Answers, setPerson2Answers] = useState([]);
  const [result, setResult] = useState(null);
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');

  const p1Profile = calculatePersonality(person1Answers);
  const p2Profile = calculatePersonality(person2Answers);
  const compatibility = calculateCompatibility(p1Profile, p2Profile);
  const handleAnswer = (value) => {
    if (currentPerson === 1) {
      const newAnswers = [...person1Answers];
      newAnswers[currentQuestion] = value;
      setPerson1Answers(newAnswers);
    } else {
      const newAnswers = [...person2Answers];
      newAnswers[currentQuestion] = value;
      setPerson2Answers(newAnswers);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentPerson === 1) {
        setCurrentPerson(2);
        setCurrentQuestion(0);
        setStep('person2intro');
      } else {
        // Calculate results
        const p1Profile = calculatePersonality(person1Answers);
        const p2Profile = calculatePersonality(person2Answers);
        const compatibility = calculateCompatibility(p1Profile, p2Profile);

        setResult({
          person1: { name: person1Name, ...p1Profile },
          person2: { name: person2Name, ...p2Profile },
          compatibility
        });
        setStep('result');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetTest = () => {
    setStep('intro');
    setCurrentPerson(1);
    setCurrentQuestion(0);
    setPerson1Name('');
    setPerson2Name('');
    setPerson1Answers([]);
    setPerson2Answers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Intro Screen */}
      {step === 'intro' && (
        <Intro
          setStep={setStep}
          person1Name={person1Name}
          person2Name={person2Name}
          setPerson1Name={setPerson1Name}
          setPerson2Name={setPerson2Name}
        />
      )}

      {/* Person 2 Intro Screen */}
      {step === 'person2intro' && (
        <Person2
          person2Name={person2Name}
          person1Name={person1Name}
          setStep={setStep}
        />
      )}

      {/* Test Screen */}
      {step === 'test' && (
        <QuestionsPage
          person1Name={person1Name}
          person2Name={person2Name}
          currentPerson={currentPerson}
          currentQuestion={currentQuestion}
          questions={questions}
          person1Answers={person1Answers}
          person2Answers={person2Answers}
          handleAnswer={handleAnswer}
          handlePrevious={handlePrevious}
        />
      )}

      {/* Results Screen */}
      {step === 'result' && result && (
        <Result
          result={result}
          resetTest={resetTest}
          getPersonalityDescription={getPersonalityDescription}
        />
      )}
    </div>
  );
};

export default PersonalityCompatibilityTest;
