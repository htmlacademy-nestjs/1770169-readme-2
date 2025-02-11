import { createMessage } from '@project/lib/shared/helpers';
import { notificationsMailValidationSchema } from './notifications-mail-validation.schema';
import { NotificationsMailConfig } from './notifications-mail.interface';
import { DEFAULT_SMTP_PORT, ErrorMessage } from './notifications-mail.constant';
import { registerAs } from '@nestjs/config';

function validationMailConfig(config: NotificationsMailConfig): void {
  const { error } = notificationsMailValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error]))
  }
}

function getMailConfig(): NotificationsMailConfig {
  const config: NotificationsMailConfig = {
    host: process.env.MAIL_SMTP_HOST,
    port: parseInt(process.env.MAIL_SMTP_PORT, 10) || DEFAULT_SMTP_PORT,
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM
  }

  validationMailConfig(config);

  return config;
 }

export default registerAs('mailConfig', getMailConfig);
