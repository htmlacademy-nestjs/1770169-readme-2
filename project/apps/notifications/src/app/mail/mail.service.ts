import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { notificationsMailConfig } from '@project/lib/config/notifications';
import { Subscriber } from '@project/lib/shared/app/types';

import { EMAIL_PUBLICATION_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  @Inject(notificationsMailConfig.KEY)
  private readonly notificationsMailConfig: ConfigType<typeof notificationsMailConfig>

  public async sendNotifyNewPublication(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notificationsMailConfig.from,
      to: subscriber.email,
      subject: EMAIL_PUBLICATION_SUBJECT,
      template: './add-publication',
      context: {
        title: 'Test'
      }
    })
  }
}
