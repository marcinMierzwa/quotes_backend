import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
    constructor
    (private userService: UsersService) {}

    //SIGN_UP
    async createUser(signUpDto: SignUpDto) {
        const {email, password} = signUpDto;
        const isEmailInUse = await this.userService.findByEmail(email);
        if (isEmailInUse) {
            throw new UnauthorizedException('Email is already in use')
        }
        const user = await this.userService.createUser(signUpDto);
        console.log(user);
        
    }

}
