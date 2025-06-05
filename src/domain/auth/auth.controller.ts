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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  private configService: ConfigService) {}
  

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

    response.cookie('refreshToken', tokens.refresh, {
      httpOnly: true,
      secure: true, // change to false on dev
      sameSite: 'none', 
      path: '/', // if only for /auth/refresh
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

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

    response.cookie('refreshToken', tokens.refresh, {
      httpOnly: true,
      secure: true, // change to false on dev
      sameSite: 'none', 
      path: '/', // if only for /auth/refresh
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });
    return {
      accessToken: tokens.access,
    };
  }

  //SIGNUP && LOGIN GOOGLE
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @HttpCode(HttpStatus.OK)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCalback(@Request() req, @Res({ passthrough: true }) response: Response) {

    const tokens = await this.authService.login(req.user.id);
    
    

    response.cookie('refreshToken', tokens.refresh, {
      httpOnly: true,
      secure: true, // change to false on dev
      sameSite: 'none', // change to lax on production
      path: '/', // if only for /auth/refresh
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      domain: '.vercel.app', 
    });

    // return {
    //   accessToken: tokens.access,
    //   message: 'Successful login!',
    // };
    // const redirectUrl = 'http://localhost:4200/home'; //   change on production
    const redirectUrl = 'https://quotesfrontend.vercel.app/home'; //    change on development
     return response.redirect(redirectUrl);
  }

  //LOGOUT

  @Post('logout')
  @UseGuards(RefreshAuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) response: Response) {

    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      domain: '.vercel.app', 
    });
   return await this.authService.logout(req.user.id);
  }

  // NOWY, TYMCZASOWY ENDPOINT DO DEBUGOWANIA
  @Get('debug/env')
  debugEnv() {
    const prodClientUrl = this.configService.get<string>('DATASOURCE_PROD_CLIENT_URL');
    const devClientUrl = this.configService.get<string>('DATASOURCE_DEV_CLIENT_URL');

    return {
      message: 'Debugowanie zmiennych środowiskowych i CORS',
      prodClientUrl: prodClientUrl || 'NIE ZNALEZIONO!',
      devClientUrl: devClientUrl || 'NIE ZNALEZIONO!',
      finalCorsOrigins: [prodClientUrl, devClientUrl].filter(Boolean)
    };
  }
}
