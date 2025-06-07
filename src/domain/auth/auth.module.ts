import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { TokenModule } from '../../token/token.module';
import { MailModule } from '../../mail/mail.module';
import { CookieOptionsService } from './cookie-options.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy, RefreshJwtStrategy, CookieOptionsService],
  imports: [UsersModule, MailModule, TokenModule],
  exports: [CookieOptionsService]
})
export class AuthModule {}
