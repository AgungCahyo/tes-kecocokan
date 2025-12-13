// src/app/api/wa/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { isVerified, markVerified } from '@/lib/waVerificationStore';

export async function GET(req: NextRequest) {
    try {
        const phone = req.nextUrl.searchParams.get('phone');

        if (!phone) {
            return NextResponse.json({ verified: false }, { status: 400 });
        }

        return NextResponse.json({ verified: isVerified(phone) });

    } catch (error) {
        console.error('WA check error:', error);
        return NextResponse.json({ verified: false }, { status: 500 });
    }
}

// Also accept POST for marking (alternative)
export async function POST(req: NextRequest) {
    try {
        const { phone, action } = await req.json();

        if (!phone) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        if (action === 'mark') {
            markVerified(phone);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ verified: isVerified(phone) });

    } catch (error) {
        return NextResponse.json({ verified: false }, { status: 500 });
    }
}
