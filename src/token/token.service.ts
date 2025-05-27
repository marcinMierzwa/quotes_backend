import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { VerifyToken } from './schemas/verify-token.schema';
import { Model, Types } from 'mongoose';
import { AuthJwtPayload } from './models/auth-jwt-payload.type';
import { RefreshToken } from './schemas/refresh-token.schema';
import { VerifyEmailDto } from '../domain/auth/dtos/verify-email.dto';
import { UsersService } from '../domain/users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UsersService,
    @InjectModel(VerifyToken.name) private verifyTokenModel: Model<VerifyToken>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<VerifyToken>,
  ) {}

  // utils
  async findByUserId(userId: Types.ObjectId) {
    return await this.refreshTokenModel.findOne({
    userId: new Types.ObjectId(userId),
  });
    
  }

  // #generating tokens
  async generateAndUpdateverifyToken(userId: Types.ObjectId): Promise<string> {
    const token = uuidv4();

    await this.verifyTokenModel.updateOne({ userId }, { upsert: true });
    return token;
  }

  async generateAccessToken(userId: Types.ObjectId): Promise<string> {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get<string>('DATASOURCE_JWT_ACCESS_SECRET'),
      expiresIn: this.config.get<string>('DATASOURCE_JWT_ACCESS_EXPIRES_IN'),
    });

    return token;
  }

  async generateRefreshToken(userId: Types.ObjectId): Promise<string> {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get<string>('DATASOURCE_JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('DATASOURCE_JWT_REFRESH_EXPIRES_IN'),
    });
    return token;
  }

  async updateRefreshTokenInDataBase(
    userId: Types.ObjectId,
    hashedToken: string | null,
  ) {
   return await this.refreshTokenModel.findOneAndUpdate(
  { userId: new Types.ObjectId(userId)},
  { hashedToken },
  { upsert: true }
);
  }

  //  #veryfing tokens
  async verifyEmailToken(token: VerifyEmailDto): Promise<{ message: string }> {
    // validate token
    const tokenDoc = await this.verifyTokenModel.findOne(token);

    if (!tokenDoc) {
      throw new NotFoundException(
        'Sorry, invalid or expired verification token',
      );
    }

    if (tokenDoc.used) {
      throw new BadRequestException(
        'Sorry, your verification token has already been used.',
      );
    }

    // validate user
    const user = await this.userService.findById(tokenDoc.userId);
    if (!user) {
      throw new NotFoundException('Sorry, User not found');
    }

    if (user.verified) {
      return {
        message: 'User already verified, you may log in to your account',
      };
    }

    // update user
    user.verified = true;
    await user.save();

    tokenDoc.used = true;
    await tokenDoc.save();

    return {
      message:
        'Great! Email successfully verified, now you can log in and take full advantage of your account!',
    };
  }
}
