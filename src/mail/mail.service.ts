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
      <a href="http://localhost:4200/verify?token=${token}">Click this link to verify your email address</a>
    `;

    return this.resendService.sendEmail({ to, subject, html });
  }

  async sendResetPasswordEmail(to: string, token: string) {
    const subject = 'Your Password Reset Request for Magic Movie Quotes';
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          
          <h2 style="color: #444; text-align: center;">Reset Your Password</h2>
          
          <p>Hi ${to},</p>
          
          <p>We received a request to reset the password for your account on <strong>Magic Movie Quotes</strong>. If you made this request, please click the button below to set a new password.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:4200/reset-password?token=${token}" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Your Password
            </a>
          </div>
          
          <p>For your security, this link will expire in <strong>30 minutes</strong>.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="font-size: 0.9em; color: #777;">
            If you did not request a password reset, you can safely ignore this email. Your password will not be changed.
          </p>
          
          <p style="font-size: 0.9em; color: #777;">
            Thanks,<br>
            The Magic Movie Quotes Team
          </p>
        </div>
      </div>
    `;
    return this.resendService.sendEmail({ to, subject, html });
  } 


}
