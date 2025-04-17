import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
      private readonly jwtService: JwtService,
      private readonly config: ConfigService,
    ) {}

    // #generating tokens
    generateVerifyEmailToken(email: string): string {
        const payload = { email };
        return this.jwtService.sign(payload, {
          secret: this.config.get<string>('DATASOURCE_JWT_VERIFY_EMAIL_SECRET'),
          expiresIn: this.config.get<string>('DATASOURCE_JWT_VERIFY_EMAIL_EXPIRES_IN'),
        });
      }
    
    //  #veryfing tokens

    verifyVerifyEmailToken(token: string) {
        return this.jwtService.verify(token, {
            secret: this.config.get<string>('DATASOURCE_JWT_VERIFY_EMAIL_SECRET'),
          });
    }

}