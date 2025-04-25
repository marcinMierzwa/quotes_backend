import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { VerifyToken } from './schemas/verify-token.schema';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class TokenService {
    constructor(
      private readonly jwtService: JwtService,
      private readonly config: ConfigService,
      @InjectModel(VerifyToken.name) private verifyTokenModel: Model<VerifyToken>
    ) {}

    // #generating tokens
    async generateVerifyEmailToken(userId: Types.ObjectId): Promise<string> {
        const token  = uuidv4();
        await this.verifyTokenModel.create({
          userId,
          token
        })
        return token
      }
    
    //  #veryfing tokens

    verifyEmailToken(token: string) {
    }

}