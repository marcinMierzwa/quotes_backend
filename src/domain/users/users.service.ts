import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUser } from '../auth/models/create-user.interface';
import { UpadateVerified } from '../auth/models/update-verified.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string | Types.ObjectId) {
    return this.userModel.findById(id);
  }

  async createUser(createUser: CreateUser) {
    return await this.userModel.create(createUser);
  }

  async resetUserPassword(userId: Types.ObjectId, password: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    user.password = password;
    await user.save();
    return user;
  }
  

  async verifyUser(updateVerified: UpadateVerified) {
    await this.userModel.updateOne(updateVerified);
  }


  async getUser(id: Types.ObjectId) {
    const user = await this.findById(id);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
