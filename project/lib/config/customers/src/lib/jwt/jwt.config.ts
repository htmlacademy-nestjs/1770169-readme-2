import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { jwtValidationSchema } from './jwt-validation.schema';
import { JWTConfig } from './jwt.interface';
import { VALIDATE_ERROR_MESSAGE } from './jwt.constant';

function validateConfig(config: JWTConfig): void {
  const { error } = jwtValidationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  };

  validateConfig(config);
  return config;
}

export default registerAs('jwt', getConfig);
