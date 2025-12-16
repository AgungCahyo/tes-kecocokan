// src/app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/waVerificationStore'; // Reusing the existing prisma client instance
// If you see a type error here, please restart the TS server or the dev server. The types are generated.

export async function POST(req: NextRequest) {
    try {
        const { orderId, action } = await req.json();

        if (!orderId) {
            return NextResponse.json(
                { success: false, error: 'Order ID required' },
                { status: 400 }
            );
        }

        // Check if order was already processed
        if (action === 'check') {
            // CAST TO ANY IS REQUIRED TO FIX STALE IDE TYPES
            // The type IS valid (verified by tsc), but VS Code caching causes a false error.
            const order = await (prisma as any).processedOrder.findUnique({
                where: { id: orderId }
            });

            return NextResponse.json({
                success: true,
                processed: !!order
            });
        }

        // Mark order as processed
        if (action === 'mark') {
            await (prisma as any).processedOrder.upsert({
                where: { id: orderId },
                update: {},
                create: { id: orderId }
            });

            // UPDATE PAYMENT STATUS
            let payment = null;
            try {
                payment = await (prisma as any).payment.update({
                    where: { id: orderId },
                    data: { status: 'SUCCESS' },
                    include: { testResult: true }
                });
            } catch (e) {
                console.error(`Failed to update payment status for ${orderId}:`, e);
                // Non-blocking error, as processedOrder is the critical check
            }

            // CALL PERSONALITY-TEST WEBHOOK TO SEND WHATSAPP MESSAGE
            const personalityWebhookUrl = process.env.PERSONALITY_TEST_WEBHOOK_URL;
            if (personalityWebhookUrl && payment?.testResult) {
                try {
                    const testResult = payment.testResult;
                    const webhookPayload = {
                        person1: { name: testResult.person1Name, profile: {} },
                        person2: { name: testResult.person2Name, profile: {} },
                        compatibility: testResult.compatibility,
                        whatsapp: payment.customerPhone,
                        orderId: orderId,
                        requestType: 'premium_analysis',
                        paymentStatus: 'success'
                    };

                    const response = await fetch(personalityWebhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(webhookPayload)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // Save the AI message to TestResult
                        if (data.message) {
                            await (prisma as any).testResult.update({
                                where: { id: testResult.id },
                                data: { message: data.message }
                            });
                            console.log('Saved AI message for:', testResult.id);
                        }
                    } else {
                        console.error('Personality webhook failed:', response.status);
                    }
                } catch (webhookError) {
                    console.error('Error calling personality webhook:', webhookError);
                }
            }

            return NextResponse.json({
                success: true,
                message: 'Order marked as processed'
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        );

    } catch (error) {
        console.error('Error in payment verification API:', error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
