import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload } from 'src/token/models/auth-jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('DATASOURCE_JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub };
  }
}
