// src/app/data/relationship/compatibility.ts
// Kalkulasi kecocokan antara dua profil kepribadian

import { PersonalityProfile, CompatibilityResult } from '@/types';

/**
 * Bobot untuk setiap aspek kecocokan
 */
const COMPATIBILITY_WEIGHTS = {
    personality: 0.25,    // 25% - Tipe kepribadian MBTI
    communication: 0.25,  // 25% - Gaya komunikasi & konflik
    values: 0.25,         // 25% - Nilai & bahasa cinta
    lifestyle: 0.25,      // 25% - Preferensi gaya hidup
};

/**
 * Menghitung skor kecocokan tipe kepribadian MBTI
 */
const calculateTypeCompatibility = (type1: string, type2: string): number => {
    // Tipe sama persis
    if (type1 === type2) return 100;

    // Cocok di E/I dan T/F (dimensi penting untuk hubungan)
    if (type1[0] === type2[0] && type1[2] === type2[2]) return 80;

    // Cocok di S/N dan J/P (cara memproses informasi dan gaya hidup)
    if (type1[1] === type2[1] && type1[3] === type2[3]) return 70;

    // Default untuk tipe yang berbeda
    return 60;
};

/**
 * Menghitung skor kecocokan gaya komunikasi
 */
const calculateCommunicationCompatibility = (
    comm1: string,
    comm2: string,
    conflict1: string,
    conflict2: string
): number => {
    const commMatch = comm1 === comm2 ? 90 : 70;
    const conflictMatch = conflict1 === conflict2 ? 90 : 75;
    return (commMatch + conflictMatch) / 2;
};

/**
 * Menghitung skor kecocokan nilai dan bahasa cinta
 */
const calculateValuesCompatibility = (
    value1: string,
    value2: string,
    love1: string,
    love2: string
): number => {
    const valueMatch = value1 === value2 ? 95 : 70;
    const loveMatch = love1 === love2 ? 90 : 75;
    return (valueMatch + loveMatch) / 2;
};

/**
 * Menghitung skor kecocokan gaya hidup
 */
const calculateLifestyleCompatibility = (lifestyle1: string, lifestyle2: string): number => {
    return lifestyle1 === lifestyle2 ? 90 : 65;
};

/**
 * Menghitung kecocokan keseluruhan antara dua profil kepribadian
 * 
 * @param p1 - Profil kepribadian orang pertama
 * @param p2 - Profil kepribadian orang kedua
 * @returns CompatibilityResult dengan skor keseluruhan dan breakdown
 */
export const calculateCompatibility = (
    p1: PersonalityProfile,
    p2: PersonalityProfile
): CompatibilityResult => {
    const breakdown = {
        personality: calculateTypeCompatibility(p1.type, p2.type),
        communication: calculateCommunicationCompatibility(
            p1.commStyle,
            p2.commStyle,
            p1.conflictStyle,
            p2.conflictStyle
        ),
        values: calculateValuesCompatibility(
            p1.topValue,
            p2.topValue,
            p1.loveLanguage,
            p2.loveLanguage
        ),
        lifestyle: calculateLifestyleCompatibility(
            p1.lifestylePreference,
            p2.lifestylePreference
        ),
    };

    const overall = Math.round(
        (breakdown.personality * COMPATIBILITY_WEIGHTS.personality) +
        (breakdown.communication * COMPATIBILITY_WEIGHTS.communication) +
        (breakdown.values * COMPATIBILITY_WEIGHTS.values) +
        (breakdown.lifestyle * COMPATIBILITY_WEIGHTS.lifestyle)
    );

    return { overall, breakdown };
};
