import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload } from 'src/token/models/auth-jwt-payload.type';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('DATASOURCE_JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['refreshToken']; //the same name as at controller-login
      },
    });
  }

  validate( req: Request, payload: AuthJwtPayload,) {
    const refreshTokenFromRequest = req.cookies.refreshToken;
    if (!refreshTokenFromRequest) throw new UnauthorizedException('Refresh token not found in request');
    const userId = payload.sub;
    return this.authService.validateRefreshToken(userId, refreshTokenFromRequest);
  }
}
