import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { GoogleAuthGuard } from './guards/google-auth-guard/google-auth-guard.guard';
import { VerifyEmailDto } from './dtos/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //SIGNUP 

  @Post('signup')
  createUser(@Body() signUpDto: SignUpDto) {
    return this.authService.createUser(signUpDto);
  }

  // VERIFY EMAIL

  @Post('verify')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
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
