import { Controller, Post, Query } from '@nestjs/common';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { Post as PostType, RabbitRouting } from '@project/lib/shared/app/types';

import { PublicationsSubscriberService } from './publications-subscriber.service';
import { CreatePublicationsSubscriberDTO } from './dto/create-publications-subscriber.dto';
import { MailService } from '../mail/mail.service';
import { NotificationsSubscribe, ROUTE } from './publications-subscriber.constants';

@Controller()
export class PublicationsSubscriberController {
  constructor(
    private readonly publicationsSubscriberService: PublicationsSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @Post(ROUTE)
  public async sendLastPublications(@Query('email') email: string) {
    this.publicationsSubscriberService.getLastPublications({email});
  }

  @RabbitSubscribe({
    exchange: NotificationsSubscribe.EXCHANGE,
    routingKey: RabbitRouting.AddSubscriber,
    queue: NotificationsSubscribe.QUEUE
  })
  public async addSubscriber(dto: CreatePublicationsSubscriberDTO) {
    await this.publicationsSubscriberService.saveSubscriber(dto);
  }

  @RabbitSubscribe({
    exchange: NotificationsSubscribe.EXCHANGE,
    routingKey: RabbitRouting.PublicationsReceived,
    queue: NotificationsSubscribe.QUEUE
  })
  public async send(message: {email: string, posts: PostType[]}) {
    this.mailService.sendNotifyNewPublication(message.email, message.posts)
  }
}
