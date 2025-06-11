import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { GoogleAuthGuard } from './guards/google-auth-guard/google-auth-guard.guard';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { ResendDto } from './dtos/resend-verification.dto';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { ConfigService } from '@nestjs/config';
import { CookieOptionsService } from './cookie-options.service';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private cookieService: CookieOptionsService,
  ) {}

  //SIGNUP

  @Post('signup')
  async createUser(@Body() signUpDto: SignUpDto) {
    return await this.authService.createUser(signUpDto);
  }

  // VERIFY EMAIL

  @Post('verify')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return await this.authService.verifyEmail(verifyEmailDto);
  }

  // RESEND VERIFICATION EMAIL

  @Post('resend-verification')
  async resendVerification(@Body() body: ResendDto) {
    return await this.authService.resendVerification(body.email);
  }

  // LOGIN
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(req.user.id);
    response.cookie(
      'refreshToken',
      tokens.refresh,
      this.cookieService.getRefreshTokenOptions(),
    );

    return {
      accessToken: tokens.access,
      message: 'Successful login!',
    };
  }

  // REFRESH
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refreshToken(req.user.id);

    response.cookie(
      'refreshToken',
      tokens.refresh,
      this.cookieService.getRefreshTokenOptions(),
    );

    return {
      accessToken: tokens.access,
    };
  }

  // FORGOT PASSWORD
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body);
  }

  // RESET PASSWORD
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.authService.resetPasword(body);
    return { message: 'Your password has been reset successfully.' };
  }

  //SIGNUP && LOGIN GOOGLE
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @HttpCode(HttpStatus.OK)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCalback(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(req.user.id);

    response.cookie(
      'refreshToken',
      tokens.refresh,
      this.cookieService.getRefreshTokenOptions(),
    );

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';
    const prodRedirect = this.configService.get<string>(
      'DATASOURCE_PROD_CLIENT_URL',
    );
    const devRedirect = this.configService.get<string>(
      'DATASOURCE_DEV_CLIENT_URL',
    );
    const redirectUrl = isProd ? prodRedirect : devRedirect;
    return response.redirect(redirectUrl);
  }

  //LOGOUT

  @Post('logout')
  @UseGuards(RefreshAuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) response: Response) {
    response.clearCookie(
      'refreshToken',
      this.cookieService.getRefreshTokenLogoutOptions(),
    );
    return await this.authService.logout(req.user.id);
  }

  // ENDPOINT TO DEBUG VERCEL
  //https://quotes-backend-nine.vercel.app/auth/debug/env
  //http://localhost:3000/auth/debug/env
  // @Get('debug/env')
  // debugEnv() {
  //   const devMode = this.configService.get<string>('NODE_ENV');
  //   console.log(devMode);
  //   return {
  //     devmode: devMode,
  //   };
  // }
}
