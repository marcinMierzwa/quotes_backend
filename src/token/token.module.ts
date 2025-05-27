import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyToken, VerifyTokenSchema } from './schemas/verify-token.schema';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { UsersModule } from '../domain/users/users.module';

@Module({
  imports:[
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync ({
      useFactory: async (configService: ConfigService) => ({}),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
      name: VerifyToken.name,
      schema: VerifyTokenSchema
    },
    {
      name: RefreshToken.name,
      schema: RefreshTokenSchema
    }
  ])
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
