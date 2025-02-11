import * as Joi from 'joi';

export const notificationsRabbitValidationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().required(),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
})
