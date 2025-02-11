import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { customersRabbitConfig } from '@project/lib/config/customers';
import { RabbitRouting } from '@project/lib/shared/app/types';

import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(customersRabbitConfig.KEY)
    private readonly rabbitOption: ConfigType<typeof customersRabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish(
      this.rabbitOption.exchange,
      RabbitRouting.AddSubscriber,
      {...dto}
    )
  };
}
