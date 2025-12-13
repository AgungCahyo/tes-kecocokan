// src/app/api/wa/check/route.ts
// Called by frontend to check if phone is verified
import { NextRequest, NextResponse } from 'next/server';

// Shared verified phones store
// Note: In production, use Redis or database for persistence
const verifiedPhones = new Map<string, { verified: boolean; timestamp: number }>();

export async function GET(req: NextRequest) {
    try {
        const phone = req.nextUrl.searchParams.get('phone');

        if (!phone) {
            return NextResponse.json(
                { verified: false, error: 'Phone required' },
                { status: 400 }
            );
        }

        // Normalize phone number
        const normalizedPhone = phone.replace(/\D/g, '');

        const data = verifiedPhones.get(normalizedPhone);

        return NextResponse.json({
            verified: data?.verified || false
        });

    } catch (error) {
        console.error('WA check error:', error);
        return NextResponse.json(
            { verified: false, error: 'Server error' },
            { status: 500 }
        );
    }
}

// Also accept POST for marking verified (alternative to /verify)
export async function POST(req: NextRequest) {
    try {
        const { phone, action } = await req.json();

        if (!phone) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const normalizedPhone = phone.replace(/\D/g, '');

        if (action === 'mark') {
            verifiedPhones.set(normalizedPhone, {
                verified: true,
                timestamp: Date.now()
            });
            return NextResponse.json({ success: true });
        }

        // Default: just check
        const data = verifiedPhones.get(normalizedPhone);
        return NextResponse.json({ verified: data?.verified || false });

    } catch (error) {
        return NextResponse.json({ verified: false }, { status: 500 });
    }
}
