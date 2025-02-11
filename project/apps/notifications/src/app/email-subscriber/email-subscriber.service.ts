import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateEmailSubscriberDTO } from './dto/create-email-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(dto: CreateEmailSubscriberDTO) {
    const existsSubscriber = await this.emailSubscriberRepository
      .findEmail(dto.email);

    if(existsSubscriber) {
      return existsSubscriber;
    }

    this.emailSubscriberRepository
      .save(new EmailSubscriberEntity().populate(dto))
  }
}
