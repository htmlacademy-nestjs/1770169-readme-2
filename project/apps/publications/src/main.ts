/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';

import { createSwagger } from '@project/lib/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v2';
  const configService = app.get(ConfigService);
  const port = configService.get<string>('app.port');
  const hostname = configService.get<string>('app.host');
  createSwagger(app);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes();

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`);
}

bootstrap();
