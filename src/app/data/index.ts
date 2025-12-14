// src/app/data/index.ts
// Barrel file untuk re-export semua data dan fungsi

// MBTI
export { mbtiQuestions, MBTI_QUESTION_COUNT } from './mbti/questions';
export { getPersonalityDescription, calculatePersonality } from './mbti/personality';

// Relationship
export { relationshipQuestions, RELATIONSHIP_QUESTION_COUNT } from './relationship/questions';
export { calculateCompatibility } from './relationship/compatibility';

// Constants
export { scaleOptions, scaleOptionsShort } from './constants';

// Combined questions (untuk backward compatibility)
import { mbtiQuestions } from './mbti/questions';
import { relationshipQuestions } from './relationship/questions';

/**
 * Semua pertanyaan digabung untuk digunakan di halaman tes
 * Total: 40 pertanyaan (20 MBTI + 20 Relationship)
 */
export const questions = [...mbtiQuestions, ...relationshipQuestions];

export const TOTAL_QUESTION_COUNT = questions.length;
