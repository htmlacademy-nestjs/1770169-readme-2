import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/lib/shared/helpers';

import { NotificationService } from './notification.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(getRabbitMQOptions('customersRabbit'))
  ],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
