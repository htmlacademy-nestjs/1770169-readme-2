import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { notificationAppValidationSchema } from './notifications-app-validation.schema';
import { NotificationsAppConfig } from './notifications-app.interface';
import { DEFAULT_HOSTNAME, DEFAULT_PORT, ErrorMessage } from './notifications-app.constant';

function validationAppConfig(config: NotificationsAppConfig): void {
  const { error } = notificationAppValidationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error]));
  }
}

function getAppConfig(): NotificationsAppConfig {
  const config: NotificationsAppConfig = {
    environment: process.env.NODE_ENV,
    host: process.env.HOST || DEFAULT_HOSTNAME,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT
  }

  validationAppConfig(config);

  return config;
}

export default registerAs('notificationsApp', getAppConfig);
