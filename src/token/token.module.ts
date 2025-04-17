import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    JwtModule.registerAsync ({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('DATASOURCE_JWT_ACCESS_SECRE'),
        signOptions: {
          expiresIn: configService.get<string>('DATASOURCE_JWT_ACCESS_EXPIRES_IN')
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
