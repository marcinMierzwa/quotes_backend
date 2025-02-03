import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://quotesfrontend.vercel.app',
      'https://quotesfrontend-marcin-mierzwas-projects.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin'],
    });await app.listen(process.env.PORT ?? 3000);}
bootstrap();
