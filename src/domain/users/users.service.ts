import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { SignUpDto } from '../auth/dtos/sign-up.dto';
import { CreateUser } from '../auth/models/create-user.interface';
import { UpadateVerified } from '../auth/models/update-verified.interface';

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

    async createUser(createUser: CreateUser) {
        return await this.user.create(createUser);
    }

    async verifyUser(updateVerified: UpadateVerified) {
        await this.user.updateOne(updateVerified);
    }

}
