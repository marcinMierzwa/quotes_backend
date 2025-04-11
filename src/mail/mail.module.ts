import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ResendService } from './resend.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [MailService, ResendService],
  exports: [MailService]
})
export class MailModule {}
