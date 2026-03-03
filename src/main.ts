import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Aumentar limite de payload para suportar imagens Base64
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  
  // HABILITAR CORS
  app.enableCors();
  
  // Define prefixo global da API
  app.setGlobalPrefix('api');
  
  // Configura o ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
