import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ObjectId } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
    private tokenService: TokenService
  ) {}

  //SIGN_UP
  async createUser(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const userInDataBase = await this.userService.findByEmail(email);
    if (userInDataBase) {
      throw new UnauthorizedException('Email is already in use');
    }
    const user = await this.userService.createUser(signUpDto);
    // send email to welcome 
    await this.mailService.sendWelcomeEmail(user.email)
    // send email to verify account
    if (user.verified === false) {
      // generate jwt token with expiry date 7 days
      const token = this.tokenService.generateVerifyEmailToken(user.email);
    await this.mailService.sendVerificationEmail(user.email, token);
      
    }

    return {
      message: 'User successfully registered',
      veryfied: user.verified,
    };
  }

  //SIGN_UP_&&_LOGIN_GOOGLE
  async validateGoogleUser(email: string) {
    let user = await this.userService.findByEmail(email);
    const verified = true;
    if (!user) {
      user = await this.userService.createUser({ email, verified });
      await this.mailService.sendWelcomeEmail(user.email)
      // send email to welcome new user
    }
    if (user.verified === false) {
      const _id: ObjectId = user.id;
      await this.userService.verifyUser(({_id, verified}));
    }
  }
}
