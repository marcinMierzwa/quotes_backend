import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { GoogleAuthGuard } from './guards/google-auth-guard/google-auth-guard.guard';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { ResendDto } from './dtos/resend-verification.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    return await this.authService.resendVerification(body.email)
  }

  // LOGIN 
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user.id);
  }

   //SIGNUP && LOGIN GOOGLE
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCalback() {

  }

}
