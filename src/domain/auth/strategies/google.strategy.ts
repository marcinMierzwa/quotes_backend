import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
// import { VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";




@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private config: ConfigService
    ) {
        super({
            clientID: config.get<string>('DATASOURCE_GOOGLE_CLIENT_ID'),
            clientSecret: config.get<string>('DATASOURCE_GOOGLE_SECRET'),
            callbackURL: config.get<string>('DATASOURCE_GOOGLE_CALLBACK_DEV_URL'),
            scope:["email", "profile"],

        })
    }

    async validate(accessToken:string, refreshToken:string, profile:Profile) {
        const email = profile.emails[0].value;
        const user = await this.authService.validateGoogleUser(
            email
        );
}

// done:VerifiedCallback
}