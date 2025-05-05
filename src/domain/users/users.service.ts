import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUser } from '../auth/models/create-user.interface';
import { UpadateVerified } from '../auth/models/update-verified.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //UTILS

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string | Types.ObjectId) {
    return this.userModel.findById(id);
  }

  //SIGN_UP

  async createUser(createUser: CreateUser) {
    return await this.userModel.create(createUser);
  }

  async verifyUser(updateVerified: UpadateVerified) {
    await this.userModel.updateOne(updateVerified);
  }

  //GET USER
  async getUser(id: Types.ObjectId) {
    const user = await this.findById(id);
    return {
      message: 'Successfuly login!',
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
