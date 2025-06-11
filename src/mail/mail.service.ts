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
      <a href="https://quotesfrontend.vercel.app/verify?token=${token}">Click this link to verify your email address</a>
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
            <a href="https://quotesfrontend.vercel.app/reset-password?token=${token}" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Your Password
            </a>
          </div>
          
          <p>For your security, this link will expire in <strong>15 minutes</strong>.</p>
          
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

  async sendResetPasswordConfirmationEmail(to: string) {
    const subject = 'Security Alert: Your Magic Movie Quotes Password Was Changed';
    const secureAccountUrl = 'https://quotesfrontend.vercel.app/forgot-password';

const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      
      <h2 style="color: #d9534f; text-align: center;">Security Alert: Password Changed</h2>
      
      <p>Hi ${to},</p>
      
      <p>This is a confirmation that the password for your <strong>Magic Movie Quotes</strong> account was successfully changed.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d9534f; margin: 20px 0;">
        <p style="margin: 0;"><strong>Details of the change:</strong></p>
        <ul style="margin: 10px 0 0 20px; padding: 0;">
          <li><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
          <li><strong>Time:</strong> ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</li>
        </ul>
      </div>

      <p>If you were the one who made this change, you can safely ignore this email. Your account is secure.</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      
      <h3 style="color: #444; text-align: center;">Didn't Make This Change?</h3>
      
      <p style="font-size: 1.1em; text-align: center; color: #d9534f;">
        <strong>If you did NOT change your password, your account may have been compromised.</strong>
      </p>
      
      <p>Please take immediate action to secure your account by clicking the button below.</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${secureAccountUrl}" style="background-color: #d9534f; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Secure Your Account Now
        </a>
      </div>
      
      <p style="font-size: 0.9em; color: #777;">
        As a security precaution, we also recommend changing the password for your email account.
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
