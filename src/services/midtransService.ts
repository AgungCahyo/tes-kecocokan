// src/services/midtransService.ts

export interface MidtransPaymentRequest {
  orderId: string;
  amount: number;
  customerEmail: string;
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
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async createTransaction(
    email: string,
    person1Name: string,
    person2Name: string
  ): Promise<MidtransPaymentResponse> {
    try {
      const orderId = `PREMIUM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const payload: MidtransPaymentRequest = {
        orderId,
        amount: 14899, 
        customerEmail: email,
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

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_payment',
          ...payload
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment creation failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        token: data.token,
        redirectUrl: data.redirect_url
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
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check_payment_status',
          orderId
        }),
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        status: data.transaction_status
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

// Configuration
export const MIDTRANS_CONFIG = {
  webhookUrl: process.env.NEXT_PUBLIC_MIDTRANS_WEBHOOK_URL ,
  enabled: process.env.NEXT_PUBLIC_MIDTRANS_ENABLED ,
  snapUrl: process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL ,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ,
};

export const midtransService = new MidtransService(MIDTRANS_CONFIG.webhookUrl || "");