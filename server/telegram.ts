
import TelegramBot from 'node-telegram-bot-api';
import type { Application, Contact } from '@shared/schema';

class TelegramService {
  private bot: TelegramBot | null = null;
  private chatId: string | null = null;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      this.bot = new TelegramBot(token, { polling: false });
      this.chatId = chatId;
    } else {
      console.warn('Telegram bot not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
    }
  }

  async sendApplicationNotification(application: Application): Promise<void> {
    if (!this.bot || !this.chatId) return;

    const message = `
🆕 *New Grant Application Received*

👤 *Applicant:* ${application.firstName} ${application.lastName}
📧 *Email:* ${application.email}
📱 *Phone:* ${application.phone}
🏠 *Location:* ${application.city}, ${application.state}
💰 *Monthly Income:* $${application.monthlyIncome}
🎯 *Funding Type:* ${application.fundingType}
💵 *Grant Amount:* ${application.grantAmount}
📝 *Purpose:* ${application.purposeDescription}
👥 *Referred By:* ${application.referredBy}
📅 *Submitted:* ${new Date(application.createdAt).toLocaleString()}

🆔 *Application ID:* ${application.id}
    `;

    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Failed to send Telegram notification for application:', error);
    }
  }

  async sendContactNotification(contact: Contact): Promise<void> {
    if (!this.bot || !this.chatId) return;

    const message = `
📨 *New Contact Form Submission*

👤 *Name:* ${contact.name}
📧 *Email:* ${contact.email}
📱 *Phone:* ${contact.phone || 'Not provided'}
📋 *Subject:* ${contact.subject || 'No subject'}
💬 *Message:* ${contact.message}
📅 *Submitted:* ${new Date(contact.createdAt).toLocaleString()}

🆔 *Contact ID:* ${contact.id}
    `;

    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Failed to send Telegram notification for contact:', error);
    }
  }

  async sendTestMessage(): Promise<boolean> {
    if (!this.bot || !this.chatId) {
      console.log('Telegram bot not configured');
      return false;
    }

    try {
      await this.bot.sendMessage(this.chatId, '🤖 Telegram bot is working! Ready to receive notifications.');
      return true;
    } catch (error) {
      console.error('Failed to send test message:', error);
      return false;
    }
  }
}

export const telegramService = new TelegramService();
