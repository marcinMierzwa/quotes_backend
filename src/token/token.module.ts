import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyToken, VerifyTokenSchema } from './schemas/verify-token.schema';
import { UsersModule } from 'src/domain/users/users.module';

@Module({
  imports:[
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync ({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('DATASOURCE_JWT_ACCESS_SECRE'),
        signOptions: {
          expiresIn: configService.get<string>('DATASOURCE_JWT_ACCESS_EXPIRES_IN')
        }
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
      name: VerifyToken.name,
      schema: VerifyTokenSchema
    }
  ])
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
