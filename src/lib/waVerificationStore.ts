// src/lib/waVerificationStore.ts
// Redis-based store for WA verification (works across serverless instances)
import Redis from 'ioredis';

// Create Redis client (use REDIS_URL from env)
const getRedisClient = () => {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        console.warn('REDIS_URL not set, verification will not persist');
        return null;
    }
    return new Redis(redisUrl);
};

let redis: Redis | null = null;

const getRedis = () => {
    if (!redis) {
        redis = getRedisClient();
    }
    return redis;
};

// Key prefix for WA verification
const KEY_PREFIX = 'wa_verified:';
const EXPIRY_SECONDS = 300; // 5 minutes

export const markVerified = async (phone: string): Promise<boolean> => {
    const normalizedPhone = phone.replace(/\D/g, '');
    const client = getRedis();

    if (!client) {
        console.error('Redis not available');
        return false;
    }

    try {
        await client.set(`${KEY_PREFIX}${normalizedPhone}`, 'true', 'EX', EXPIRY_SECONDS);
        console.log(`WA Verified: ${normalizedPhone}`);
        return true;
    } catch (error) {
        console.error('Redis markVerified error:', error);
        return false;
    }
};

export const isVerified = async (phone: string): Promise<boolean> => {
    const normalizedPhone = phone.replace(/\D/g, '');
    const client = getRedis();

    if (!client) {
        return false;
    }

    try {
        const result = await client.get(`${KEY_PREFIX}${normalizedPhone}`);
        return result === 'true';
    } catch (error) {
        console.error('Redis isVerified error:', error);
        return false;
    }
};
