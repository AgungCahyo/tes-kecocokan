// src/lib/waVerificationStore.ts - FIXED VERSION
import Redis from 'ioredis';

// Singleton Redis client
let redis: Redis | null = null;

const getRedisClient = (): Redis | null => {
    // Return existing client if available
    if (redis) {
        return redis;
    }

    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        console.error('⚠️ REDIS_URL not set in environment variables');
        console.error('WA verification will NOT work without Redis!');
        return null;
    }

    try {
        console.log('📡 Connecting to Redis...');
        redis = new Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            lazyConnect: true,
        });

        redis.on('connect', () => {
            console.log('✅ Redis connected successfully');
        });

        redis.on('error', (err) => {
            console.error('❌ Redis connection error:', err);
        });

        // Try to connect
        redis.connect().catch(err => {
            console.error('❌ Failed to connect to Redis:', err);
            redis = null;
        });

        return redis;
    } catch (error) {
        console.error('❌ Error creating Redis client:', error);
        return null;
    }
};

// Key prefix for WA verification
const KEY_PREFIX = 'wa_verified:';
// No expiry - data stored permanently

// Normalize phone number to 62xxx format
// Handles both 08xxx (local) and 62xxx (international) formats
const normalizePhone = (phone: string): string => {
    let clean = phone.replace(/\D/g, '');

    // Remove leading 0 and add 62 prefix
    if (clean.startsWith('0')) {
        clean = '62' + clean.substring(1);
    }
    // If doesn't start with 62, add it
    else if (!clean.startsWith('62')) {
        clean = '62' + clean;
    }

    console.log(`📱 [normalizePhone] ${phone} → ${clean}`);
    return clean;
};

export const markVerified = async (phone: string): Promise<boolean> => {
    const normalizedPhone = normalizePhone(phone);
    const client = getRedisClient();

    if (!client) {
        console.error('❌ [markVerified] Redis not available');
        return false;
    }

    try {
        const key = `${KEY_PREFIX}${normalizedPhone}`;
        // Store permanently without expiry
        await client.set(key, 'true');
        console.log(`✅ [markVerified] WA Verified: ${normalizedPhone} (stored permanently)`);

        // Verify it was set correctly
        const check = await client.get(key);
        console.log(`🔍 [markVerified] Verification check: ${check}`);

        return true;
    } catch (error) {
        console.error('❌ [markVerified] Redis error:', error);
        return false;
    }
};

export const isVerified = async (phone: string): Promise<boolean> => {
    const normalizedPhone = normalizePhone(phone);
    const client = getRedisClient();

    if (!client) {
        console.error('❌ [isVerified] Redis not available');
        return false;
    }

    try {
        const key = `${KEY_PREFIX}${normalizedPhone}`;
        const result = await client.get(key);
        const verified = result === 'true';

        console.log(`🔍 [isVerified] Checking ${normalizedPhone}: ${verified ? '✅ VERIFIED' : '❌ NOT VERIFIED'}`);

        return verified;
    } catch (error) {
        console.error('❌ [isVerified] Redis error:', error);
        return false;
    }
};

// Helper function to test Redis connection
export const testRedisConnection = async (): Promise<boolean> => {
    const client = getRedisClient();

    if (!client) {
        return false;
    }

    try {
        await client.ping();
        console.log('✅ Redis PING successful');
        return true;
    } catch (error) {
        console.error('❌ Redis PING failed:', error);
        return false;
    }
};