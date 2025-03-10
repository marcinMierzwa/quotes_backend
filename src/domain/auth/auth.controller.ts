import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //SIGNUP 

  @Post('signup')
  createUser(@Body() signUpDto: SignUpDto) {
    return this.authService.createUser(signUpDto);
  }

}
