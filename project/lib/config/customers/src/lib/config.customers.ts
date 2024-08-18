import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './config.constant';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigCustomers {}
