// src/lib/waVerificationStore.ts - PostgreSQL Version using Prisma
import { PrismaClient } from '@prisma/client';

// Singleton Prisma client
// NOTE: DATABASE_URL must be set in Vercel Environment Variables
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Normalize phone number to 62xxx format
const normalizePhone = (phone: string): string => {
    let clean = phone.replace(/\D/g, '');

    if (clean.startsWith('0')) {
        clean = '62' + clean.substring(1);
    } else if (!clean.startsWith('62')) {
        clean = '62' + clean;
    }

    console.log(`[normalizePhone] ${phone} -> ${clean}`);
    return clean;
};

export const markVerified = async (phone: string): Promise<boolean> => {
    const normalizedPhone = normalizePhone(phone);

    try {
        await prisma.verifiedPhone.upsert({
            where: { phone: normalizedPhone },
            update: {},
            create: { phone: normalizedPhone },
        });

        console.log(`[markVerified] WA Verified: ${normalizedPhone}`);
        return true;
    } catch (error) {
        console.error('[markVerified] PostgreSQL error:', error);
        return false;
    }
};

export const isVerified = async (phone: string): Promise<boolean> => {
    const normalizedPhone = normalizePhone(phone);

    try {
        const record = await prisma.verifiedPhone.findUnique({
            where: { phone: normalizedPhone },
        });

        const verified = record !== null;
        console.log(`[isVerified] ${normalizedPhone}: ${verified}`);

        return verified;
    } catch (error) {
        console.error('[isVerified] PostgreSQL error:', error);
        return false;
    }
};

export const testDbConnection = async (): Promise<boolean> => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log('PostgreSQL connection successful');
        return true;
    } catch (error) {
        console.error('PostgreSQL connection failed:', error);
        return false;
    }
};

export { prisma };