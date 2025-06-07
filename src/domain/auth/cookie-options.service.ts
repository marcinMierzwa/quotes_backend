import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

@Injectable()
export class CookieOptionsService {
  constructor(private readonly configService: ConfigService) {}

  getRefreshTokenOptions(): CookieOptions {
    const isProd = this.configService.get('NODE_ENV') === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 tydzień
    };
  }

  getRefreshTokenLogoutOptions(): CookieOptions {
        const isProd = this.configService.get('NODE_ENV') === 'production';

            return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    };
  }

}