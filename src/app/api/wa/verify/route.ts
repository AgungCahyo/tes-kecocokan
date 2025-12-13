// src/app/api/wa/verify/route.ts
// Called by n8n bot when user sends "START"
import { NextRequest, NextResponse } from 'next/server';

// In-memory store (use Redis/DB in production)
// This is shared with check endpoint
const verifiedPhones = new Map<string, { verified: boolean; timestamp: number }>();

// Clean up old entries every check (5 min expiry)
const cleanupOldEntries = () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    for (const [phone, data] of verifiedPhones.entries()) {
        if (data.timestamp < fiveMinutesAgo) {
            verifiedPhones.delete(phone);
        }
    }
};

export async function POST(req: NextRequest) {
    try {
        const { phone, secret } = await req.json();

        // Validate secret (optional security)
        const apiSecret = process.env.WA_VERIFY_SECRET;
        if (apiSecret && secret !== apiSecret) {
            return NextResponse.json(
                { success: false, error: 'Invalid secret' },
                { status: 401 }
            );
        }

        if (!phone) {
            return NextResponse.json(
                { success: false, error: 'Phone required' },
                { status: 400 }
            );
        }

        // Normalize phone number (remove non-digits)
        const normalizedPhone = phone.replace(/\D/g, '');

        cleanupOldEntries();

        // Mark as verified
        verifiedPhones.set(normalizedPhone, {
            verified: true,
            timestamp: Date.now()
        });

        console.log(`WA Verified: ${normalizedPhone}`);

        return NextResponse.json({
            success: true,
            message: 'Phone verified'
        });

    } catch (error) {
        console.error('WA verify error:', error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}

// Export the map for the check endpoint
export { verifiedPhones };
