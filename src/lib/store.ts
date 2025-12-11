// src/lib/store.ts
// State management menggunakan React Context dan localStorage

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PersonalityProfile, CompatibilityResult } from '@/types';

interface TestState {
  person1Name: string;
  person2Name: string;
  person1Answers: number[];
  person2Answers: number[];
  person1Profile: PersonalityProfile | null;
  person2Profile: PersonalityProfile | null;
  compatibility: CompatibilityResult | null;
  currentPerson: 1 | 2;
  currentQuestion: number;
  
  // Actions
  setPerson1Name: (name: string) => void;
  setPerson2Name: (name: string) => void;
  setPerson1Answer: (index: number, value: number) => void;
  setPerson2Answer: (index: number, value: number) => void;
  setCurrentPerson: (person: 1 | 2) => void;
  setCurrentQuestion: (question: number) => void;
  setPerson1Profile: (profile: PersonalityProfile) => void;
  setPerson2Profile: (profile: PersonalityProfile) => void;
  setCompatibility: (compat: CompatibilityResult) => void;
  resetTest: () => void;
}

const initialState = {
  person1Name: '',
  person2Name: '',
  person1Answers: [],
  person2Answers: [],
  person1Profile: null,
  person2Profile: null,
  compatibility: null,
  currentPerson: 1 as 1 | 2,
  currentQuestion: 0,
};

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setPerson1Name: (name) => set({ person1Name: name }),
      setPerson2Name: (name) => set({ person2Name: name }),
      
      setPerson1Answer: (index, value) =>
        set((state) => {
          const newAnswers = [...state.person1Answers];
          newAnswers[index] = value;
          return { person1Answers: newAnswers };
        }),
      
      setPerson2Answer: (index, value) =>
        set((state) => {
          const newAnswers = [...state.person2Answers];
          newAnswers[index] = value;
          return { person2Answers: newAnswers };
        }),
      
      setCurrentPerson: (person) => set({ currentPerson: person }),
      setCurrentQuestion: (question) => set({ currentQuestion: question }),
      setPerson1Profile: (profile) => set({ person1Profile: profile }),
      setPerson2Profile: (profile) => set({ person2Profile: profile }),
      setCompatibility: (compat) => set({ compatibility: compat }),
      
      resetTest: () => set(initialState),
    }),
    {
      name: 'personality-test-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// CATATAN: Anda perlu install zustand terlebih dahulu:
// npm install zustand

// Jika tidak ingin menggunakan zustand, bisa menggunakan React Context seperti di bawah:

/*
// src/lib/context.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { PersonalityProfile, CompatibilityResult } from '@/types';

interface TestContextType {
  person1Name: string;
  person2Name: string;
  person1Answers: number[];
  person2Answers: number[];
  person1Profile: PersonalityProfile | null;
  person2Profile: PersonalityProfile | null;
  compatibility: CompatibilityResult | null;
  currentPerson: 1 | 2;
  currentQuestion: number;
  
  setPerson1Name: (name: string) => void;
  setPerson2Name: (name: string) => void;
  setPerson1Answer: (index: number, value: number) => void;
  setPerson2Answer: (index: number, value: number) => void;
  setCurrentPerson: (person: 1 | 2) => void;
  setCurrentQuestion: (question: number) => void;
  setPerson1Profile: (profile: PersonalityProfile) => void;
  setPerson2Profile: (profile: PersonalityProfile) => void;
  setCompatibility: (compat: CompatibilityResult) => void;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person1Answers, setPerson1Answers] = useState<number[]>([]);
  const [person2Answers, setPerson2Answers] = useState<number[]>([]);
  const [person1Profile, setPerson1Profile] = useState<PersonalityProfile | null>(null);
  const [person2Profile, setPerson2Profile] = useState<PersonalityProfile | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [currentPerson, setCurrentPerson] = useState<1 | 2>(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const setPerson1Answer = (index: number, value: number) => {
    const newAnswers = [...person1Answers];
    newAnswers[index] = value;
    setPerson1Answers(newAnswers);
  };

  const setPerson2Answer = (index: number, value: number) => {
    const newAnswers = [...person2Answers];
    newAnswers[index] = value;
    setPerson2Answers(newAnswers);
  };

  const resetTest = () => {
    setPerson1Name('');
    setPerson2Name('');
    setPerson1Answers([]);
    setPerson2Answers([]);
    setPerson1Profile(null);
    setPerson2Profile(null);
    setCompatibility(null);
    setCurrentPerson(1);
    setCurrentQuestion(0);
  };

  return (
    <TestContext.Provider
      value={{
        person1Name,
        person2Name,
        person1Answers,
        person2Answers,
        person1Profile,
        person2Profile,
        compatibility,
        currentPerson,
        currentQuestion,
        setPerson1Name,
        setPerson2Name,
        setPerson1Answer,
        setPerson2Answer,
        setCurrentPerson,
        setCurrentQuestion,
        setPerson1Profile,
        setPerson2Profile,
        setCompatibility,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
}
*/