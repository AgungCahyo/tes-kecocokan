// src/types/index.ts

export interface Question {
  id: number;
  text: string;
  category: string;
  direction: string;
}

export interface ScaleOption {
  value: number;
  label: string;
}

export interface PersonalityTraits {
  energy: string;
  information: string;
  decisions: string;
  lifestyle: string;
}

export interface PersonalityProfile {
  type: string;
  traits: PersonalityTraits;
  commStyle: string;
  conflictStyle: string;
  loveLanguage: string;
  topValue: string;
  lifestylePreference: string;
  rawScores: any;
}

export interface PersonalityDescription {
  title: string;
  desc: string;
}

export interface CompatibilityBreakdown {
  personality: number;
  communication: number;
  values: number;
  lifestyle: number;
}

export interface CompatibilityResult {
  overall: number;
  breakdown: CompatibilityBreakdown;
}

export interface TestResult {
  person1: PersonalityProfile & { name: string };
  person2: PersonalityProfile & { name: string };
  compatibility: CompatibilityResult;
}

export interface WebhookPayload {
  person1: {
    name: string;
    answers: number[];
    profile: PersonalityProfile;
  };
  person2: {
    name: string;
    answers: number[];
    profile: PersonalityProfile;
  };
  compatibility: CompatibilityResult;
  timestamp: string;
}

export type StepType = 'intro' | 'test' | 'person2intro' | 'result' | 'premium';