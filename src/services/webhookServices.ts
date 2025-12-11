// src/services/webhookService.ts

import { WebhookPayload, PersonalityProfile } from '@/types';

export class WebhookService {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async sendToN8N(payload: WebhookPayload): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error sending to webhook:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  createPayload(
    person1Name: string,
    person1Answers: number[],
    person1Profile: PersonalityProfile,
    person2Name: string,
    person2Answers: number[],
    person2Profile: PersonalityProfile,
    compatibility: any
  ): WebhookPayload {
    return {
      person1: {
        name: person1Name,
        answers: person1Answers,
        profile: person1Profile,
      },
      person2: {
        name: person2Name,
        answers: person2Answers,
        profile: person2Profile,
      },
      compatibility,
      timestamp: new Date().toISOString(),
    };
  }
}

// Configuration
export const WEBHOOK_CONFIG = {
  // Ganti dengan URL webhook n8n Anda
  url: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
  enabled: process.env.NEXT_PUBLIC_WEBHOOK_ENABLED === 'true',
};

export const webhookService = new WebhookService(WEBHOOK_CONFIG.url || '');