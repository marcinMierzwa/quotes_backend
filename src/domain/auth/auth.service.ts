import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  //SIGN_UP
  async createUser(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const userInDataBase = await this.userService.findByEmail(email);
    if (userInDataBase) {
      throw new UnauthorizedException('Email is already in use');
    }
    const user = await this.userService.createUser(signUpDto);
    // here handle send email to verify account
    return {
      message: 'User successfully registered',
      userId: user.id,
    };
  }

  //SIGN_UP_&&_LOGIN_GOOGLE
  async validateGoogleUser(email: string) {
    const user = await this.userService.findByEmail(email);
    const verified = true;
    if (!user) {
      await this.userService.createUser({ email, verified });
    }
    if (user.verified === false) {
      const _id: ObjectId = user.id;
      await this.userService.verifyUser(({_id, verified}));
    }
  }
}
