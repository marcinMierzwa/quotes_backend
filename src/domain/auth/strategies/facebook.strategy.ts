import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        private authService: AuthService,
        private config: ConfigService
    ) {
    super({
      clientID: config.get<string>('DATASOURCE_FACEBOOK_CLIENT_ID'),
      clientSecret: config.get<string>('DATASOURCE_FACEBOOK_SECRET'),
      callbackURL: config.get<string>('DATASOURCE_FACEBOOK_CALLBACK_PROD_URL'),
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { name, emails, id } = profile;
            console.log(name, emails, id);
            
    // return {
    //   facebookId: id,
    //   email: emails?.[0]?.value,
    //   name: `${name.givenName} ${name.familyName}`,
    // };
  }

}