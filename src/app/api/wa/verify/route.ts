// src/app/api/wa/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { markVerified } from '@/lib/waVerificationStore';

export async function POST(req: NextRequest) {
    try {
        const { phone, secret } = await req.json();

        // Validate secret
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

        // Mark as verified in database
        const success = await markVerified(phone);

        return NextResponse.json({
            success,
            message: success ? 'Phone verified' : 'Verification failed'
        });

    } catch (error) {
        console.error('WA verify error:', error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
