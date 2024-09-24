import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { QuotePost } from '@project/lib/shared/app/types';
import { QuotePostEntity } from './quote-post.entity';
import { ErrorMessage } from './quote-post.constant';

@Injectable()
export class QuotePostRepository extends BasePostgresRepository<QuotePostEntity, QuotePost> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, QuotePostEntity.fromObject);
  }

  public async findById(id: QuotePostEntity['id']): Promise<QuotePostEntity> {
    const record = await this.clientService.quote.findFirst({
      where: {id}
    });

    if(!record) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: QuotePostEntity): Promise<QuotePostEntity> {
    const newRecord = await this.clientService.quote.create({
      data: {
        author: entity.author,
        content: entity.content
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: QuotePostEntity['id'], entity: QuotePostEntity): Promise<QuotePostEntity> {
    const record = await this.clientService.quote.update({
      where: {id},
      data: {
        author: entity.author,
        content: entity.content
      }
    });

    return this.createEntityFromDocument(record);
  }
}
