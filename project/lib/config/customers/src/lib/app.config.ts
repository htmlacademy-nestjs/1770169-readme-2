import { registerAs } from '@nestjs/config';

import * as Joi from 'joi';

import { DEFAULT_PORT, Environment, ErrorMessage } from './config.constant';
import {createMessage} from '@project/lib/shared/helpers';

export interface AppConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().port().default(DEFAULT_PORT)
});

function validateConfig(config: AppConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getConfig(): AppConfig {
  const config: AppConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT
  }
  validateConfig(config);

  return config;
}

export default registerAs('app', getConfig);
