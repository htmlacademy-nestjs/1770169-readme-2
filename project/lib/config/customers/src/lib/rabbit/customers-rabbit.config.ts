import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { customersRabbitValidationSchema } from './customers-rabbit-validation.schema';
import { CustomersRabbitConfig } from './customers-rabbit.interface';
import { DEFAULT_RABBIT_PORT, ErrorMessage } from './customers-rabbit.constant';

function validationRabbitConfig(config: CustomersRabbitConfig): void {
  const { error } = customersRabbitValidationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error]))
  }
}

function getRabbitConfig(): CustomersRabbitConfig {
  const config: CustomersRabbitConfig = {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: parseInt(process.env.RABBIT_PORT, 10) || DEFAULT_RABBIT_PORT,
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  }

  validationRabbitConfig(config);

  return config;
}

export default registerAs('customersRabbit', getRabbitConfig);
