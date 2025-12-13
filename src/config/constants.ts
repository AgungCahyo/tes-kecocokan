// src/config/constants.ts

/**
 * Pricing configuration
 */
export const PRICING = {
    PREMIUM_PRICE: 14899,
    CURRENCY: 'IDR',
    DISPLAY_PRICE: 'Rp 14.899'
} as const;

/**
 * Question/Test configuration
 */
export const QUESTION_CONFIG = {
    TOTAL_QUESTIONS: 40,
    MIN_ANSWERS_REQUIRED: 40
} as const;

/**
 * WhatsApp configuration
 */
export const WHATSAPP = {
    BOT_NUMBER: '6281392290571',
    MIN_PHONE_LENGTH: 10
} as const;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
    TEST_DATA: 'personality-test-storage',
    PAYMENT_WHATSAPP: 'payment_whatsapp'
} as const;
