// src/app/data/relationship/questions.ts
// Pertanyaan tambahan untuk mengukur gaya hubungan dan kecocokan

import { Question } from '@/types';

/**
 * Pertanyaan Relationship - 20 soal untuk aspek hubungan
 * 
 * Kategori:
 * - comm: Communication Style (Gaya Komunikasi)
 * - conflict: Conflict Resolution (Penyelesaian Konflik)
 * - love: Love Language (Bahasa Cinta)
 * - values: Values & Priorities (Nilai dan Prioritas)
 * - lifestyle: Lifestyle Preferences (Preferensi Gaya Hidup)
 */
export const relationshipQuestions: Question[] = [
    // ============================================
    // Communication Style (4 soal)
    // ============================================
    { id: 21, text: "Saya langsung dan to-the-point dalam berkomunikasi", category: 'comm', direction: 'direct' },
    { id: 22, text: "Saya ekspresif dalam menunjukkan emosi saya", category: 'comm', direction: 'expressive' },
    { id: 23, text: "Saya lebih suka mendengarkan daripada berbicara", category: 'comm', direction: 'listener' },
    { id: 24, text: "Saya diplomatic dan hati-hati dalam memilih kata", category: 'comm', direction: 'diplomatic' },

    // ============================================
    // Conflict Resolution (4 soal)
    // ============================================
    { id: 25, text: "Saya menghadapi konflik secara langsung", category: 'conflict', direction: 'direct' },
    { id: 26, text: "Saya butuh waktu untuk menenangkan diri sebelum membahas masalah", category: 'conflict', direction: 'reflective' },
    { id: 27, text: "Saya mencari kompromi dalam setiap konflik", category: 'conflict', direction: 'compromise' },
    { id: 28, text: "Saya berusaha memahami perspektif orang lain terlebih dahulu", category: 'conflict', direction: 'empathetic' },

    // ============================================
    // Love Language (4 soal)
    // ============================================
    { id: 29, text: "Saya menunjukkan kasih sayang melalui tindakan nyata", category: 'love', direction: 'acts' },
    { id: 30, text: "Kata-kata afirmasi sangat penting bagi saya", category: 'love', direction: 'words' },
    { id: 31, text: "Quality time bersama adalah prioritas saya", category: 'love', direction: 'time' },
    { id: 32, text: "Sentuhan fisik membuat saya merasa dicintai", category: 'love', direction: 'touch' },

    // ============================================
    // Values & Priorities (4 soal)
    // ============================================
    { id: 33, text: "Kejujuran adalah nilai terpenting dalam hubungan", category: 'values', direction: 'honesty' },
    { id: 34, text: "Saya menghargai kebebasan dan ruang pribadi", category: 'values', direction: 'freedom' },
    { id: 35, text: "Komitmen dan loyalitas adalah segalanya bagi saya", category: 'values', direction: 'commitment' },
    { id: 36, text: "Pertumbuhan bersama lebih penting dari kenyamanan", category: 'values', direction: 'growth' },

    // ============================================
    // Lifestyle Preferences (4 soal)
    // ============================================
    { id: 37, text: "Saya suka petualangan dan hal-hal baru", category: 'lifestyle', direction: 'adventurous' },
    { id: 38, text: "Saya lebih nyaman dengan rutinitas yang stabil", category: 'lifestyle', direction: 'stable' },
    { id: 39, text: "Saya senang menghabiskan waktu di luar rumah", category: 'lifestyle', direction: 'outdoor' },
    { id: 40, text: "Saya lebih suka aktivitas di dalam ruangan", category: 'lifestyle', direction: 'indoor' },
];

// Jumlah total pertanyaan relationship
export const RELATIONSHIP_QUESTION_COUNT = relationshipQuestions.length;
