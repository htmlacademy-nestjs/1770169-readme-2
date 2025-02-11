import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_MONGO_PORT, ErrorMessage } from './notifications-mongo.constant';
import { NotificationsMongoConfig } from './notifications-mongo-config.interface';
import { notificationsMongoValidationSchema } from './notifications-mongo-validation.schema';

function validationMongoConfig(config: NotificationsMongoConfig): void {
  const { error } = notificationsMongoValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error.message]))
  }
}

function getMongoConfig(): NotificationsMongoConfig {
  const config = {
    name: process.env.MONGO_DB_NAME,
    host: process.env.MONGO_DB_HOST,
    username: process.env.MONGO_DB_USERNAME,
    userPassword: process.env.MONGO_DB_USER_PASSWORD,
    port: parseInt(process.env.MONGO_DB_PORT, 10) || DEFAULT_MONGO_PORT,
    authSource: process.env.MONGO_AUTH_SOURCE
  }
  validationMongoConfig(config);

  return config;
}

export default registerAs('notificationsMongo', getMongoConfig);
