import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './customers.constant';
import appConfig from './app/app.config';
import mongoConfig from './mongo/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigCustomersModule {}
