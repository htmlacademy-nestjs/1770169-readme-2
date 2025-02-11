import { Module } from '@nestjs/common';

import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberController } from './email-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/lib/shared/helpers';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailSubscriberModel.name,
        schema: EmailSubscriberSchema
      }
    ]),
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions('notificationsRabbit')
    ),
    MailModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberRepository,
    EmailSubscriberService
  ]
})
export class EmailSubscriberModule {}
