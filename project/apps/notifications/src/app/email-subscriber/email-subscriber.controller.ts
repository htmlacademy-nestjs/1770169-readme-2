import { Controller } from '@nestjs/common';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateEmailSubscriberDTO } from './dto/create-email-subscriber.dto';
import { RabbitRouting } from '@project/lib/shared/app/types';

import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notifications.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notifications.income'
  })
  public async create(dto: CreateEmailSubscriberDTO) {
    await this.emailSubscriberService.addSubscriber(dto);
    await this.mailService.sendNotifyNewPublication(dto);
  }
}
