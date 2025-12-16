// src/services/midtransService.ts

export interface MidtransPaymentRequest {
  orderId: string;
  amount: number;
  customerPhone: string;
  customerName: string;
  itemDetails: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface MidtransPaymentResponse {
  success: boolean;
  token?: string;
  redirectUrl?: string;
  error?: string;
}

export class MidtransService {
  // webhookUrl no longer needed - we call internal API route

  async createTransaction(
    phoneNumber: string,
    person1Name: string,
    person2Name: string,
    compatibility?: any
  ): Promise<MidtransPaymentResponse> {
    try {
      // Call our secure API route instead of external webhook
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          person1Name,
          person2Name,
          compatibility,
          matchScore: compatibility?.overall
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal membuat transaksi');
      }

      return {
        success: true,
        token: data.token,
        redirectUrl: data.redirectUrl
      };
    } catch (error) {
      console.error('Error creating Midtrans transaction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async checkPaymentStatus(orderId: string): Promise<{
    success: boolean;
    status?: string;
    error?: string;
  }> {
    try {
      // Call internal API route for payment status (to be implemented if needed)
      const response = await fetch('/api/payment/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        status: data.status
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Configuration - Only client-side config needed now
// webhookUrl moved to server-side API route
export const MIDTRANS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_MIDTRANS_ENABLED,
  snapUrl: process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
};

export const midtransService = new MidtransService();