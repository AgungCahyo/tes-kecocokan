// src/app/data/mbti/questions.ts
// Pertanyaan MBTI untuk 4 dimensi kepribadian

import { Question } from '@/types';

/**
 * Pertanyaan MBTI - 20 soal untuk 4 dimensi
 * 
 * Dimensi:
 * - EI: Extraversion vs Introversion (Energy)
 * - SN: Sensing vs iNtuition (Information Processing)
 * - TF: Thinking vs Feeling (Decision Making)
 * - JP: Judging vs Perceiving (Lifestyle)
 * 
 * Catatan:
 * - direction menunjukkan arah positif dari pertanyaan
 * - Jika responden setuju dengan pertanyaan, skor ditambahkan ke arah tersebut
 */
export const mbtiQuestions: Question[] = [
    // ============================================
    // DIMENSI 1: Energy & Social (E/I) - 5 soal
    // ============================================
    { id: 1, text: "Saya lebih suka menghabiskan waktu dengan banyak orang daripada sendirian", category: 'EI', direction: 'E' },
    { id: 2, text: "Saya merasa energi saya terisi ulang setelah bersosialisasi", category: 'EI', direction: 'E' },
    { id: 3, text: "Saya lebih nyaman berada di keramaian daripada di tempat yang tenang", category: 'EI', direction: 'E' },
    { id: 4, text: "Saya butuh waktu sendiri untuk mengisi energi", category: 'EI', direction: 'I' },
    { id: 5, text: "Saya lebih suka percakapan yang dalam dengan sedikit orang", category: 'EI', direction: 'I' },

    // ============================================
    // DIMENSI 2: Information Processing (S/N) - 5 soal
    // ============================================
    { id: 6, text: "Saya lebih fokus pada detail dan fakta konkret", category: 'SN', direction: 'S' },
    { id: 7, text: "Saya lebih praktis dan realistis dalam menghadapi masalah", category: 'SN', direction: 'S' },
    { id: 8, text: "Saya sering memikirkan kemungkinan dan ide-ide baru", category: 'SN', direction: 'N' },
    { id: 9, text: "Saya lebih tertarik pada konsep dan teori daripada fakta", category: 'SN', direction: 'N' },
    { id: 10, text: "Saya sering membayangkan berbagai skenario di masa depan", category: 'SN', direction: 'N' },

    // ============================================
    // DIMENSI 3: Decision Making (T/F) - 5 soal
    // ============================================
    { id: 11, text: "Saya membuat keputusan berdasarkan logika daripada perasaan", category: 'TF', direction: 'T' },
    { id: 12, text: "Saya lebih mengutamakan objektifitas dalam menilai situasi", category: 'TF', direction: 'T' },
    { id: 13, text: "Saya mempertimbangkan perasaan orang lain saat membuat keputusan", category: 'TF', direction: 'F' },
    { id: 14, text: "Harmoni dan empati penting bagi saya dalam hubungan", category: 'TF', direction: 'F' },
    { id: 15, text: "Saya mudah merasakan emosi orang lain", category: 'TF', direction: 'F' },

    // ============================================
    // DIMENSI 4: Lifestyle (J/P) - 5 soal
    // ============================================
    { id: 16, text: "Saya suka membuat rencana detail sebelum melakukan sesuatu", category: 'JP', direction: 'J' },
    { id: 17, text: "Saya merasa nyaman dengan rutinitas dan struktur", category: 'JP', direction: 'J' },
    { id: 18, text: "Saya lebih suka fleksibilitas dan spontanitas", category: 'JP', direction: 'P' },
    { id: 19, text: "Saya nyaman dengan perubahan mendadak", category: 'JP', direction: 'P' },
    { id: 20, text: "Saya sering menunda pekerjaan hingga mendekati deadline", category: 'JP', direction: 'P' },
];

// Jumlah total pertanyaan MBTI
export const MBTI_QUESTION_COUNT = mbtiQuestions.length;
