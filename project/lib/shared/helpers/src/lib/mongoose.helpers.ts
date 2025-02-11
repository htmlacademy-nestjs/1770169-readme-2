import { ConfigService } from '@nestjs/config';

import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from './common.helpers';

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async(config: ConfigService) => ({
      uri: getMongoConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        port: config.get<string>(`${optionSpace}.port`),
        database: config.get<string>(`${optionSpace}.name`),
        username: config.get<string>(`${optionSpace}.username`),
        userPassword: config.get<string>(`${optionSpace}.userPassword`),
        authSource: config.get<string>(`${optionSpace}.authSource`)
      })
    }),
    inject: [ConfigService]
  }
}
