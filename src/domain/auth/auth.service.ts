import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ObjectId } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { LoginDto } from './dtos/login.dto';
import * as argon2 from 'argon2'; 

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
      throw new UnauthorizedException('Sorry, email is already in use!');
    }
    const user = await this.userService.createUser(signUpDto);
    // send email to welcome 
    await this.mailService.sendWelcomeEmail(user.email) !!!!!!!!!!!!!!!!!!!!!!!
    // send email to verify account
    if (user.verified === false) {
      // generate and send verification token 
    const token =  await this.tokenService.generateEmailToken(user._id);
    await this.mailService.sendVerificationEmail(user.email, token);
      
    }

    return {
      message: 'Your account has just been created, now still check your email inbox and confirm your adrress.',
      veryfied: user.verified,
    };
  }

  //VERIFY EMAIL ADDRESS
  async verifyEmail(tokenDto: VerifyEmailDto) {
    return await this.tokenService.verifyEmailToken(tokenDto);
  }

  //LOGIN LOCAL

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Sorry, user not found!');
    const isPasswordMatch = await argon2.verify(user.password, password);
    if(!isPasswordMatch) throw new UnauthorizedException('Invalid Credentials!');

    return { message: 'Successful login!', id: user._id };
  }

  //SIGN_UP_&&_LOGIN_GOOGLE
  async validateGoogleUser(email: string) {
    let user = await this.userService.findByEmail(email);
    const verified = true;
    if (!user) {
      user = await this.userService.createUser({ email, verified });
      await this.mailService.sendWelcomeEmail(user.email) !!!!!!!!!!!!!!!!!!!
      // send email to welcome new user
    }
    if (user.verified === false) {
      const _id: ObjectId = user.id;
      await this.userService.verifyUser(({_id, verified}));
    }
  }

}
