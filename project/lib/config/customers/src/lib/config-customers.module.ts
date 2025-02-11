import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './customers.constant';
import customersAppConfig from './app/customers-app.config';
import customersMongoConfig from './mongo/customers-mongo.config';
import customersJwtConfig from './jwt/customers-jwt.config';
import customersRabbitConfig from './rabbit/customers-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        customersAppConfig,
        customersMongoConfig,
        customersJwtConfig,
        customersRabbitConfig
      ],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigCustomersModule {}
