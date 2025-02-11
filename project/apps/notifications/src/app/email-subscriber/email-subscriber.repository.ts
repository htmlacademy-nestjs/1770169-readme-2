import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/lib/core';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberModel } from './email-subscriber.model';

export class EmailSubscriberRepository extends BaseMongoRepository<
EmailSubscriberEntity,
EmailSubscriberModel
> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) emailSubscriberModel: Model<EmailSubscriberModel>
  ) {
    super(emailSubscriberModel, EmailSubscriberEntity.fromObject);
  }

  public async findEmail(email: string) {
    const document = await this.model.findOne({email}).exec();

    return this.createEntityFromDocument(document);
  }
}
