import * as Joi from 'joi';

import { Environment } from './notifications-app.enum';

export const notificationAppValidationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  host: Joi.string().required(),
  port: Joi.number().port().required()
});
