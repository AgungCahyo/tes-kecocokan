// src/app/api/wa/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { isVerified, markVerified } from '@/lib/waVerificationStore';

export async function GET(req: NextRequest) {
    try {
        const phone = req.nextUrl.searchParams.get('phone');

        if (!phone) {
            return NextResponse.json({ verified: false }, { status: 400 });
        }

        const verified = await isVerified(phone);
        return NextResponse.json({ verified });

    } catch (error) {
        console.error('WA check error:', error);
        return NextResponse.json({ verified: false }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { phone, action } = await req.json();

        if (!phone) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        if (action === 'mark') {
            const success = await markVerified(phone);
            return NextResponse.json({ success });
        }

        const verified = await isVerified(phone);
        return NextResponse.json({ verified });

    } catch (error) {
        return NextResponse.json({ verified: false }, { status: 500 });
    }
}
