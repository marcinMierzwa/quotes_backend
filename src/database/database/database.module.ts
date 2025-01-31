import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATASOURCE_DATABASE_URL');
          if (!connectionString) {
            throw new Error('DATASOURCE_DATABASE_URL is not defined in .env file');
        }
        return {
          uri: connectionString
        }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}