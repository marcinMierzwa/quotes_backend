import { Injectable } from '@nestjs/common';
import { ResendService } from './resend.service';

@Injectable()
export class MailService {
  constructor(private readonly resendService: ResendService) {}

  async sendWelcomeEmail(to: string) {
    const subject = 'Welcome in Magic Movie Quotes!';
    const html = `
      <h1>Welcome ${to}!</h1>
      <p>Thank you for joining Magic movie quotes. The best Lord of the Rings movie quotes are waiting for you!</p>
    `;

    return this.resendService.sendEmail({ to, subject, html });
  }

  async sendVerificationEmail(to: string, token: string) {
    const subject = 'Verify your email address';
    const html = `
      <p>Click the link below to verify your email address</p>
      <a href="https://quotesfrontend.vercel.app/login?token=${token}">Click this link to verify your email address</a>
      <p>The link will be active for 7 days</p>

    `;

    return this.resendService.sendEmail({ to, subject, html });
  }


}
