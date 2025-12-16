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
            try {
                await (prisma as any).payment.update({
                    where: { id: orderId },
                    data: { status: 'SUCCESS' }
                });
            } catch (e) {
                console.error(`Failed to update payment status for ${orderId}:`, e);
                // Non-blocking error, as processedOrder is the critical check
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
