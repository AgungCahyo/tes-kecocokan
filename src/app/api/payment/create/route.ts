// src/app/api/payment/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/waVerificationStore';

interface PaymentRequest {
    phoneNumber: string;
    person1Name: string;
    person2Name: string;
}

export async function POST(req: NextRequest) {
    try {
        const { phoneNumber, person1Name, person2Name, compatibility, matchScore }: PaymentRequest & { compatibility?: any, matchScore?: number } = await req.json();

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
        // Ignore webhookUrl check if it's not set, we are moving away from it anyway for internal logic.
        // But for now let's keep it to avoid breaking changes if it was used.

        // SAVE TO DATABASE
        let testResultId = '';
        if (compatibility) {
            const result = await (prisma as any).testResult.create({
                data: {
                    person1Name,
                    person2Name,
                    matchScore: matchScore || compatibility.overall || 0,
                    compatibility
                    // analysis removed, we will save 'message' from webhook response
                }
            });
            testResultId = result.id;
        }

        await (prisma as any).payment.create({
            data: {
                id: orderId,
                amount: 14899,
                customerName: `${person1Name} & ${person2Name}`,
                customerPhone: cleanNumber,
                status: 'PENDING',
                testResultId: testResultId || undefined // Allow undefined if no test result (shouldn't happen in flow)
            }
        });


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
            ],
            // Pass data for n8n to generate message
            compatibility,
            person1Name,
            person2Name
        };

        // Call the actual Midtrans/N8N webhook (server-side, secure)
        // If webhookUrl is set, use it. Otherwise just return mock/success (migration phase).
        let data = { token: 'mock_token', redirect_url: '', message: '' };

        if (webhookUrl) {
            const externalResponse = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!externalResponse.ok) {
                console.error('Payment creation failed:', externalResponse.status, externalResponse.statusText);
                return NextResponse.json(
                    { success: false, error: 'Gagal membuat transaksi pembayaran' },
                    { status: 500 }
                );
            }
            data = await externalResponse.json();

            // SAVE WEBHOOK RESPONSE MESSAGE TO DB
            if (data.message && testResultId) {
                try {
                    await (prisma as any).testResult.update({
                        where: { id: testResultId },
                        data: { message: data.message }
                    });
                    console.log('Saved AI message for:', testResultId);
                } catch (err) {
                    console.error('Failed to save AI message:', err);
                }
            }
        } else {
            // If no webhook, we can't get a real token.
            // This path assumes the webhook IS configured as per env file check earlier.
            console.warn('MIDTRANS_WEBHOOK_URL not set, skipping external call (Development mode?)');
        }

        // Return the data (either from webhook or mock)
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
