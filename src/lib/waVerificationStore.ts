// src/lib/waVerificationStore.ts
// Shared in-memory store for WA verification (use Redis in production)

const verifiedPhones = new Map<string, { verified: boolean; timestamp: number }>();

// Clean up entries older than 5 minutes
export const cleanupOldEntries = () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    for (const [phone, data] of verifiedPhones.entries()) {
        if (data.timestamp < fiveMinutesAgo) {
            verifiedPhones.delete(phone);
        }
    }
};

export const markVerified = (phone: string) => {
    const normalizedPhone = phone.replace(/\D/g, '');
    cleanupOldEntries();
    verifiedPhones.set(normalizedPhone, {
        verified: true,
        timestamp: Date.now()
    });
    console.log(`WA Verified: ${normalizedPhone}`);
};

export const isVerified = (phone: string): boolean => {
    const normalizedPhone = phone.replace(/\D/g, '');
    const data = verifiedPhones.get(normalizedPhone);
    return data?.verified || false;
};
