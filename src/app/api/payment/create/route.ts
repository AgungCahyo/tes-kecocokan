// src/app/api/payment/create/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface PaymentRequest {
    phoneNumber: string;
    person1Name: string;
    person2Name: string;
}

export async function POST(req: NextRequest) {
    try {
        const { phoneNumber, person1Name, person2Name }: PaymentRequest = await req.json();

        // Validate input
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        if (!cleanNumber || cleanNumber.length < 10) {
            return NextResponse.json(
                { success: false, error: 'Nomor WhatsApp tidak valid' },
                { status: 400 }
            );
        }

        if (!person1Name || !person2Name) {
            return NextResponse.json(
                { success: false, error: 'Nama tidak boleh kosong' },
                { status: 400 }
            );
        }

        // Generate unique order ID
        const orderId = `PREMIUM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Server-side env var (NOT public)
        const webhookUrl = process.env.MIDTRANS_WEBHOOK_URL;
        if (!webhookUrl) {
            console.error('MIDTRANS_WEBHOOK_URL not configured');
            return NextResponse.json(
                { success: false, error: 'Payment service not configured' },
                { status: 500 }
            );
        }

        // Create payment request payload
        const payload = {
            action: 'create_payment',
            orderId,
            amount: 14899,
            customerPhone: cleanNumber,
            customerName: `${person1Name} & ${person2Name}`,
            itemDetails: [
                {
                    id: 'premium-analysis',
                    name: 'Analisis Premium AI - Personality Compatibility',
                    price: 14899,
                    quantity: 1
                }
            ]
        };

        // Call the actual Midtrans/N8N webhook (server-side, secure)
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Payment creation failed:', response.status, response.statusText);
            return NextResponse.json(
                { success: false, error: 'Gagal membuat transaksi pembayaran' },
                { status: 500 }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            token: data.token,
            redirectUrl: data.redirect_url,
            orderId
        });

    } catch (error) {
        console.error('Error in payment creation API:', error);
        return NextResponse.json(
            { success: false, error: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
