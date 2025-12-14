// src/app/data/mbti/personality.ts
// Fungsi dan data untuk kalkulasi dan deskripsi kepribadian MBTI

import { PersonalityDescription, PersonalityProfile } from '@/types';
import { mbtiQuestions } from './questions';
import { relationshipQuestions } from '../relationship/questions';

/**
 * Deskripsi 16 tipe kepribadian MBTI
 */
const personalityDescriptions: Record<string, PersonalityDescription> = {
    // Analysts (NT)
    'INTJ': { title: 'Arsitek', desc: 'Pemikir strategis dengan rencana untuk segalanya' },
    'INTP': { title: 'Pemikir', desc: 'Inovator yang haus akan pengetahuan' },
    'ENTJ': { title: 'Komandan', desc: 'Pemimpin yang berani dan imajinatif' },
    'ENTP': { title: 'Pendebat', desc: 'Pemikir cerdas yang suka tantangan intelektual' },

    // Diplomats (NF)
    'INFJ': { title: 'Advokat', desc: 'Idealis yang tenang namun inspiratif' },
    'INFP': { title: 'Mediator', desc: 'Penyair yang altruistik dan baik hati' },
    'ENFJ': { title: 'Protagonis', desc: 'Pemimpin karismatik yang menginspirasi' },
    'ENFP': { title: 'Aktivis', desc: 'Antusias, kreatif, dan sosiabel' },

    // Sentinels (SJ)
    'ISTJ': { title: 'Logistik', desc: 'Praktis dan berbasis fakta' },
    'ISFJ': { title: 'Pembela', desc: 'Pelindung yang berdedikasi dan hangat' },
    'ESTJ': { title: 'Eksekutif', desc: 'Administrator yang efisien' },
    'ESFJ': { title: 'Konsul', desc: 'Sangat caring dan populer' },

    // Explorers (SP)
    'ISTP': { title: 'Virtuoso', desc: 'Eksperimen yang berani dan praktis' },
    'ISFP': { title: 'Petualang', desc: 'Artis yang fleksibel dan menawan' },
    'ESTP': { title: 'Entrepreneur', desc: 'Pintar, enerjik, dan perseptif' },
    'ESFP': { title: 'Penghibur', desc: 'Spontan, enerjik, dan antusias' },
};

/**
 * Mendapatkan deskripsi untuk tipe kepribadian tertentu
 */
export const getPersonalityDescription = (type: string): PersonalityDescription => {
    return personalityDescriptions[type] || { title: 'Unik', desc: 'Kepribadian yang menarik' };
};

/**
 * Mendapatkan pilihan teratas dari objek skor
 */
const getTopChoice = (obj: Record<string, number>): string => {
    const entries = Object.entries(obj);
    if (entries.length === 0) return 'unknown';
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
};

/**
 * Menghitung profil kepribadian dari jawaban tes
 * 
 * @param answers - Array jawaban dengan nilai -3 sampai +3
 * @returns PersonalityProfile dengan tipe MBTI dan traits lainnya
 */
export const calculatePersonality = (answers: number[]): PersonalityProfile => {
    // Gabungkan semua pertanyaan
    const allQuestions = [...mbtiQuestions, ...relationshipQuestions];

    // Inisialisasi skor
    const scores: Record<string, any> = {
        EI: 0, // Positif = E, Negatif = I
        SN: 0, // Positif = S, Negatif = N
        TF: 0, // Positif = T, Negatif = F
        JP: 0, // Positif = J, Negatif = P
        comm: {},
        conflict: {},
        love: {},
        values: {},
        lifestyle: {}
    };

    // Hitung skor berdasarkan jawaban
    allQuestions.forEach((q, idx) => {
        const answer = answers[idx] || 0;

        // Kategori MBTI (EI, SN, TF, JP)
        if (['EI', 'SN', 'TF', 'JP'].includes(q.category)) {
            // Jika direction adalah huruf pertama dari kategori (E, S, T, J)
            // maka jawaban positif menambah skor positif
            const firstLetter = q.category[0];
            if (q.direction === firstLetter) {
                scores[q.category] += answer;
            } else {
                // Jika direction adalah huruf kedua (I, N, F, P)
                // maka jawaban positif mengurangi skor (menambah ke arah kedua)
                scores[q.category] -= answer;
            }
        } else {
            // Kategori relationship (comm, conflict, love, values, lifestyle)
            if (!scores[q.category][q.direction]) {
                scores[q.category][q.direction] = 0;
            }
            scores[q.category][q.direction] += Math.abs(answer);
        }
    });

    // Tentukan tipe MBTI berdasarkan skor
    // Skor positif = huruf pertama, Skor negatif/nol = huruf kedua
    const type =
        (scores.EI > 0 ? 'E' : 'I') +
        (scores.SN > 0 ? 'S' : 'N') +
        (scores.TF > 0 ? 'T' : 'F') +
        (scores.JP > 0 ? 'J' : 'P');

    return {
        type,
        traits: {
            energy: scores.EI > 0 ? 'Ekstrovert' : 'Introvert',
            information: scores.SN > 0 ? 'Sensing' : 'Intuitif',
            decisions: scores.TF > 0 ? 'Thinking' : 'Feeling',
            lifestyle: scores.JP > 0 ? 'Judging' : 'Perceiving'
        },
        commStyle: getTopChoice(scores.comm),
        conflictStyle: getTopChoice(scores.conflict),
        loveLanguage: getTopChoice(scores.love),
        topValue: getTopChoice(scores.values),
        lifestylePreference: getTopChoice(scores.lifestyle),
        rawScores: scores
    };
};
