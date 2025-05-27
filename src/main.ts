import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('DATASOURCE_PORT') || 3000;

  const clientUrls = [
    configService.get<string>('DATASOURCE_PROD_CLIENT_URL'),
        configService.get<string>('DATASOURCE_DEV_CLIENT_URL'),

  ].filter(Boolean); 

  app.use(cookieParser());
  app.enableCors({
    origin: clientUrls,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
}

bootstrap();
