// src/app/api/wa/check/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { isVerified, markVerified } from '@/lib/waVerificationStore';

export async function GET(req: NextRequest) {
    try {
        const phone = req.nextUrl.searchParams.get('phone');

        if (!phone) {
            return NextResponse.json(
                { verified: false, exists: false, error: 'Phone number required' },
                { status: 400 }
            );
        }

        // Normalize phone number
        const cleanPhone = phone.replace(/\D/g, '');

        if (cleanPhone.length < 10) {
            return NextResponse.json(
                { verified: false, exists: false, error: 'Invalid phone number' },
                { status: 400 }
            );
        }

        console.log(`[WA Check] Checking verification for: ${cleanPhone}`);

        const verified = await isVerified(cleanPhone);

        console.log(`[WA Check] Result for ${cleanPhone}: ${verified}`);

        // Return both 'verified' and 'exists' for n8n workflow compatibility
        return NextResponse.json(
            {
                verified,
                exists: verified  // exists = true if number is verified in database
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                }
            }
        );

    } catch (error) {
        console.error('[WA Check] Error:', error);
        return NextResponse.json(
            { verified: false, error: 'Server error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { phone, action } = await req.json();

        if (!phone) {
            return NextResponse.json(
                { success: false, error: 'Phone number required' },
                { status: 400 }
            );
        }

        const cleanPhone = phone.replace(/\D/g, '');

        if (action === 'mark') {
            console.log(`[WA Check] Marking as verified: ${cleanPhone}`);
            const success = await markVerified(cleanPhone);
            return NextResponse.json({ success });
        }

        // Default: check verification
        const verified = await isVerified(cleanPhone);
        return NextResponse.json({ verified });

    } catch (error) {
        console.error('[WA Check] POST Error:', error);
        return NextResponse.json(
            { verified: false, error: 'Server error' },
            { status: 500 }
        );
    }
}