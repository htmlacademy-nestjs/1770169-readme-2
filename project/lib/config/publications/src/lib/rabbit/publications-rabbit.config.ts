import { registerAs } from '@nestjs/config';

import { getRabbitMQConfig } from '@project/lib/shared/helpers';

export default registerAs('publicationsRabbit', getRabbitMQConfig);
