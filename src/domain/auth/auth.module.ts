import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [UsersModule, MailModule, TokenModule]
})
export class AuthModule {}
