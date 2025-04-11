import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { EmailModel } from './models/emailModel.inteface';

@Injectable()
export class ResendService {
  private resend: Resend;

  constructor(
    private configService: ConfigService
  ) {;
    const apiKey = this.configService.get<string>('DATASOURCE_RESEND_API_KEY')
    this.resend = new Resend(apiKey); 
  }

  async sendEmail({
    to,
    subject,
    html,
    from = 'Magic Movie Quotes <contact@magicmoviequotes.com.pl>',
  }: EmailModel
  ) {
    const { data, error } = await this.resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
        console.error('Error sending email:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }
      
    return data;
  }
}
