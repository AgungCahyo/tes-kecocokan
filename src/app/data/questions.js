export const questions = [
    // Energy & Social (E/I)
    { id: 1, text: "Saya lebih suka menghabiskan waktu dengan banyak orang daripada sendirian", category: 'EI', direction: 'E' },
    { id: 2, text: "Saya merasa energi saya terisi ulang setelah bersosialisasi", category: 'EI', direction: 'E' },
    { id: 3, text: "Saya lebih nyaman berada di keramaian daripada di tempat yang tenang", category: 'EI', direction: 'E' },
    { id: 4, text: "Saya butuh waktu sendiri untuk mengisi energi", category: 'EI', direction: 'I' },
    { id: 5, text: "Saya lebih suka percakapan yang dalam dengan sedikit orang", category: 'EI', direction: 'I' },

    // Information Processing (S/N)
    { id: 6, text: "Saya lebih fokus pada detail dan fakta konkret", category: 'SN', direction: 'S' },
    { id: 7, text: "Saya lebih praktis dan realistis dalam menghadapi masalah", category: 'SN', direction: 'S' },
    { id: 8, text: "Saya sering memikirkan kemungkinan dan ide-ide baru", category: 'SN', direction: 'N' },
    { id: 9, text: "Saya lebih tertarik pada konsep dan teori daripada fakta", category: 'SN', direction: 'N' },
    { id: 10, text: "Saya sering membayangkan berbagai skenario di masa depan", category: 'SN', direction: 'N' },

    // Decision Making (T/F)
    { id: 11, text: "Saya membuat keputusan berdasarkan logika daripada perasaan", category: 'TF', direction: 'T' },
    { id: 12, text: "Saya lebih mengutamakan objektifitas dalam menilai situasi", category: 'TF', direction: 'T' },
    { id: 13, text: "Saya mempertimbangkan perasaan orang lain saat membuat keputusan", category: 'TF', direction: 'F' },
    { id: 14, text: "Harmoni dan empati penting bagi saya dalam hubungan", category: 'TF', direction: 'F' },
    { id: 15, text: "Saya mudah merasakan emosi orang lain", category: 'TF', direction: 'F' },

    // Lifestyle (J/P)
    { id: 16, text: "Saya suka membuat rencana detail sebelum melakukan sesuatu", category: 'JP', direction: 'J' },
    { id: 17, text: "Saya merasa nyaman dengan rutinitas dan struktur", category: 'JP', direction: 'J' },
    { id: 18, text: "Saya lebih suka fleksibilitas dan spontanitas", category: 'JP', direction: 'P' },
    { id: 19, text: "Saya nyaman dengan perubahan mendadak", category: 'JP', direction: 'P' },
    { id: 20, text: "Saya sering menunda pekerjaan hingga mendekati deadline", category: 'JP', direction: 'P' },

    // Communication Style
    { id: 21, text: "Saya langsung dan to-the-point dalam berkomunikasi", category: 'comm', direction: 'direct' },
    { id: 22, text: "Saya ekspresif dalam menunjukkan emosi saya", category: 'comm', direction: 'expressive' },
    { id: 23, text: "Saya lebih suka mendengarkan daripada berbicara", category: 'comm', direction: 'listener' },
    { id: 24, text: "Saya diplomatic dan hati-hati dalam memilih kata", category: 'comm', direction: 'diplomatic' },

    // Conflict Resolution
    { id: 25, text: "Saya menghadapi konflik secara langsung", category: 'conflict', direction: 'direct' },
    { id: 26, text: "Saya butuh waktu untuk menenangkan diri sebelum membahas masalah", category: 'conflict', direction: 'reflective' },
    { id: 27, text: "Saya mencari kompromi dalam setiap konflik", category: 'conflict', direction: 'compromise' },
    { id: 28, text: "Saya berusaha memahami perspektif orang lain terlebih dahulu", category: 'conflict', direction: 'empathetic' },

    // Affection & Love Language
    { id: 29, text: "Saya menunjukkan kasih sayang melalui tindakan nyata", category: 'love', direction: 'acts' },
    { id: 30, text: "Kata-kata afirmasi sangat penting bagi saya", category: 'love', direction: 'words' },
    { id: 31, text: "Quality time bersama adalah prioritas saya", category: 'love', direction: 'time' },
    { id: 32, text: "Sentuhan fisik membuat saya merasa dicintai", category: 'love', direction: 'touch' },

    // Values & Priorities
    { id: 33, text: "Kejujuran adalah nilai terpenting dalam hubungan", category: 'values', direction: 'honesty' },
    { id: 34, text: "Saya menghargai kebebasan dan ruang pribadi", category: 'values', direction: 'freedom' },
    { id: 35, text: "Komitmen dan loyalitas adalah segalanya bagi saya", category: 'values', direction: 'commitment' },
    { id: 36, text: "Pertumbuhan bersama lebih penting dari kenyamanan", category: 'values', direction: 'growth' },

    // Lifestyle Preferences
    { id: 37, text: "Saya suka petualangan dan hal-hal baru", category: 'lifestyle', direction: 'adventurous' },
    { id: 38, text: "Saya lebih nyaman dengan rutinitas yang stabil", category: 'lifestyle', direction: 'stable' },
    { id: 39, text: "Saya senang menghabiskan waktu di luar rumah", category: 'lifestyle', direction: 'outdoor' },
    { id: 40, text: "Saya lebih suka aktivitas di dalam ruangan", category: 'lifestyle', direction: 'indoor' },
];

export const scaleOptions = [
    { value: -3, label: "Sangat Tidak Setuju" },
    { value: -2, label: "Tidak Setuju" },
    { value: -1, label: "Agak Tidak Setuju" },
    { value: 0, label: "Netral" },
    { value: 1, label: "Agak Setuju" },
    { value: 2, label: "Setuju" },
    { value: 3, label: "Sangat Setuju" }
];

export const getPersonalityDescription = (type) => {
    const descriptions = {
        'INTJ': { title: 'Arsitek', desc: 'Pemikir strategis dengan rencana untuk segalanya' },
        'INTP': { title: 'Pemikir', desc: 'Inovator yang haus akan pengetahuan' },
        'ENTJ': { title: 'Komandan', desc: 'Pemimpin yang berani dan imajinatif' },
        'ENTP': { title: 'Pendebat', desc: 'Pemikir cerdas yang suka tantangan intelektual' },
        'INFJ': { title: 'Advokat', desc: 'Idealis yang tenang namun inspiratif' },
        'INFP': { title: 'Mediator', desc: 'Penyair yang altruistik dan baik hati' },
        'ENFJ': { title: 'Protagonis', desc: 'Pemimpin karismatik yang menginspirasi' },
        'ENFP': { title: 'Aktivis', desc: 'Antusias, kreatif, dan sosiabel' },
        'ISTJ': { title: 'Logistik', desc: 'Praktis dan berbasis fakta' },
        'ISFJ': { title: 'Pembela', desc: 'Pelindung yang berdedikasi dan hangat' },
        'ESTJ': { title: 'Eksekutif', desc: 'Administrator yang efisien' },
        'ESFJ': { title: 'Konsul', desc: 'Sangat caring dan populer' },
        'ISTP': { title: 'Virtuoso', desc: 'Eksperimen yang berani dan praktis' },
        'ISFP': { title: 'Petualang', desc: 'Artis yang fleksibel dan menawan' },
        'ESTP': { title: 'Entrepreneur', desc: 'Pintar, enerjik, dan perseptif' },
        'ESFP': { title: 'Penghibur', desc: 'Spontan, enerjik, dan antusias' }
    };
    return descriptions[type] || { title: 'Unik', desc: 'Kepribadian yang menarik' };
};

export const calculatePersonality = (answers) => {
    const scores = {
        EI: 0, SN: 0, TF: 0, JP: 0,
        comm: {}, conflict: {}, love: {}, values: {}, lifestyle: {}
    };

    questions.forEach((q, idx) => {
        const answer = answers[idx] || 0;

        if (['EI', 'SN', 'TF', 'JP'].includes(q.category)) {
            if (q.direction === q.category[0]) {
                scores[q.category] += answer;
            } else {
                scores[q.category] -= answer;
            }
        } else {
            if (!scores[q.category][q.direction]) {
                scores[q.category][q.direction] = 0;
            }
            scores[q.category][q.direction] += Math.abs(answer);
        }
    });

    const type =
        (scores.EI > 0 ? 'E' : 'I') +
        (scores.SN > 0 ? 'N' : 'S') +
        (scores.TF > 0 ? 'T' : 'F') +
        (scores.JP > 0 ? 'J' : 'P');

    const getTopChoice = (obj) => {
        return Object.entries(obj).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    };

    return {
        type,
        traits: {
            energy: scores.EI > 0 ? 'Ekstrovert' : 'Introvert',
            information: scores.SN > 0 ? 'Intuitif' : 'Sensing',
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

// utils/calculateCompatibility.js

export const calculateCompatibility = (p1, p2) => {
  let breakdown = {
    personality: 0,
    communication: 0,
    values: 0,
    lifestyle: 0
  };

  // Personality type compatibility (25%)
  const typeMatch = (p1.type === p2.type) ? 100 :
    (p1.type[0] === p2.type[0] && p1.type[2] === p2.type[2]) ? 80 :
    (p1.type[1] === p2.type[1] && p1.type[3] === p2.type[3]) ? 70 : 60;
  breakdown.personality = typeMatch;

  // Communication & conflict style (25%)
  const commMatch = (p1.commStyle === p2.commStyle) ? 90 : 70;
  const conflictMatch = (p1.conflictStyle === p2.conflictStyle) ? 90 : 75;
  breakdown.communication = (commMatch + conflictMatch) / 2;

  // Values & love language (25%)
  const valueMatch = (p1.topValue === p2.topValue) ? 95 : 70;
  const loveMatch = (p1.loveLanguage === p2.loveLanguage) ? 90 : 75;
  breakdown.values = (valueMatch + loveMatch) / 2;

  // Lifestyle (25%)
  const lifestyleMatch = (p1.lifestylePreference === p2.lifestylePreference) ? 90 : 65;
  breakdown.lifestyle = lifestyleMatch;

  const overall = Math.round(
    (breakdown.personality * 0.25) +
    (breakdown.communication * 0.25) +
    (breakdown.values * 0.25) +
    (breakdown.lifestyle * 0.25)
  );

  return { overall, breakdown };
};
