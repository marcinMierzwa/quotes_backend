import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const clientUrls = [
    configService.get<string>('DATASOURCE_PROD_CLIENT_URL'),
    configService.get<string>('DATASOURCE_DEV_CLIENT_URL'),
  ].filter(Boolean); 

  app.enableCors({
    origin: clientUrls,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
