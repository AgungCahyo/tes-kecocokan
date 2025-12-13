// src/app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';

// In-memory store for processed orders (in production, use Redis or database)
// This is a simple solution for demo purposes
const processedOrders = new Set<string>();

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
            return NextResponse.json({
                success: true,
                processed: processedOrders.has(orderId)
            });
        }

        // Mark order as processed
        if (action === 'mark') {
            processedOrders.add(orderId);
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
