// src/app/data/constants.ts
// Konstanta dan opsi untuk tes kepribadian

import { ScaleOption } from '@/types';

/**
 * Opsi skala Likert untuk jawaban tes
 * Rentang: -3 (Sangat Tidak Setuju) sampai +3 (Sangat Setuju)
 */
export const scaleOptions: ScaleOption[] = [
    { value: -3, label: "Sangat Tidak Setuju" },
    { value: -2, label: "Tidak Setuju" },
    { value: -1, label: "Agak Tidak Setuju" },
    { value: 0, label: "Netral" },
    { value: 1, label: "Agak Setuju" },
    { value: 2, label: "Setuju" },
    { value: 3, label: "Sangat Setuju" }
];

/**
 * Label untuk skala pendek (digunakan di mobile atau compact view)
 */
export const scaleOptionsShort: ScaleOption[] = [
    { value: -3, label: "STS" },
    { value: -2, label: "TS" },
    { value: -1, label: "ATS" },
    { value: 0, label: "N" },
    { value: 1, label: "AS" },
    { value: 2, label: "S" },
    { value: 3, label: "SS" }
];
