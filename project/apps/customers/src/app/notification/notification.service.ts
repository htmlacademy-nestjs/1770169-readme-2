import { Injectable } from '@nestjs/common';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/lib/shared/app/types';

import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { NotificationsSubscribe } from './notification.constant';

@Injectable()
export class NotificationService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish<CreateSubscriberDTO>(
      NotificationsSubscribe.EXCHANGE,
      RabbitRouting.AddSubscriber,
      {...dto}
    )
  };
}
