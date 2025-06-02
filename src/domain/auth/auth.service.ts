import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ObjectId, Types } from 'mongoose';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import * as argon2 from 'argon2';
import { MailService } from '../../mail/mail.service';
import { TokenService } from '../../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
    private tokenService: TokenService,
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
    await this.mailService.sendWelcomeEmail(user.email);
    // send email to verify account
    if (user.verified === false) {
      // generate and send verification token
      const token = await this.tokenService.generateAndUpdateVerifyToken(user._id);
      await this.mailService.sendVerificationEmail(user.email, token);
    }

    return {
      message:
        'Your account has just been created, now still check your email inbox and confirm your adrress.',
    };
  }

  //VERIFY EMAIL ADDRESS
  async verifyEmail(tokenDto: VerifyEmailDto) {
    return await this.tokenService.verifyEmailToken(tokenDto);
  }

  //RESEND VERIFICATION EMAIL
  async resendVerification(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new NotFoundException('User with this email does not exist');
    if (user.verified)
      throw new BadRequestException('Email is already verified');
    const token = await this.tokenService.generateAndUpdateVerifyToken(user._id);
    console.log(token);

    await this.mailService.sendVerificationEmail(user.email, token);

    return {
      message:
        'Verification email has been resent, now still check your email inbox and confirm your adrress.',
    };
  }

  //LOGIN LOCAL
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Sorry, user not found!');
    if (!user.password) throw new UnauthorizedException('Invalid Credentails')
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid Credentials!');
    const isVerified = user.verified;
    if (!isVerified) {
      throw new UnauthorizedException({
        message:
          'Your email address is not verified. Please check your inbox for the verification link you received when creating your account, or click link below to get a new one.',
        code: 'EMAIL_NOT_VERIFIED',
      });
    }
    return {
      message: 'Successful login!',
      id: user._id,
    };
  }

  //LOGIN JWT
  async login(userId: Types.ObjectId) {
    const accessToken = await this.tokenService.generateAccessToken(userId);
    const refreshToken = await this.tokenService.generateRefreshToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.tokenService.updateRefreshTokenInDataBase(userId, hashedRefreshToken);
    return { access: accessToken, refresh: refreshToken };
  }

  //REFRESH
  async refreshToken(userId: Types.ObjectId) {
    const accessToken = await this.tokenService.generateAccessToken(userId);
    const refreshToken = await this.tokenService.generateRefreshToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.tokenService.updateRefreshTokenInDataBase(userId, hashedRefreshToken);
    return { access: accessToken, refresh: refreshToken };
  }

  async validateRefreshToken(userId: Types.ObjectId, refreshTokenFromRequest: string) {
    const refreshTokenFromDataBase = await this.tokenService.findByUserId(userId);
    const hashedTokenFromDataBase = refreshTokenFromDataBase.get('hashedToken');
    if(!refreshTokenFromDataBase) throw new UnauthorizedException('Invalid Refresh Token');
    const refreshTokensMatches = await argon2.verify(hashedTokenFromDataBase, refreshTokenFromRequest)
    if(!refreshTokensMatches) throw new UnauthorizedException('Invalid Refresh Token');
    return { id : userId };
  }

  //SIGN_UP_&&_LOGIN_GOOGLE
  async validateGoogleUser(email: string) {
    let user = await this.userService.findByEmail(email);
    const verified = true;
    if (!user) {
      user = await this.userService.createUser({ email, verified });
      // await this.mailService.sendWelcomeEmail(user.email);
      // send email to welcome new user
    }
    if (user.verified === false) {
      const _id: ObjectId = user.id;
      await this.userService.verifyUser({ _id, verified });
    }
    return user
  }

  //LOGOUT
  async logout(userId: Types.ObjectId) {
    await this.tokenService.updateRefreshTokenInDataBase(userId, null);
    return {
      message: 'User successfuly logout!'
    }
  }
}
