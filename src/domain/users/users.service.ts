import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dtos/sign-up.dto';

@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) private user: Model<User>) {}

    //UTILS

    async findByEmail(email: string) {
        return await this.user.findOne({ email });
    }

    async findById(id: string) {
        return await this.user.findOne({ id });
    }

    //SIGN_UP

    async createUser(signUpDto: SignUpDto) {
        const { email, password } = signUpDto;
        return await this.user.create({ email, password });
    }

}
