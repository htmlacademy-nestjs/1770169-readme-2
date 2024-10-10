import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { TextPost } from '@project/lib/shared/app/types';
import { BasePostgresRepository } from '@project/lib/core';
import { TextPostEntity } from './text-post.entity';
import { ErrorMessage } from './text-post.constant';

@Injectable()
export class TextPostRepository extends BasePostgresRepository<TextPostEntity, TextPost> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, TextPostEntity.fromObject);
  }

  public async findById(id: TextPostEntity['id']): Promise<TextPostEntity> {
    const record = await this.clientService.text.findFirst({
      where: {id}
    });

    if(!record) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: TextPostEntity): Promise<TextPostEntity> {
    const newRecord = await this.clientService.text.create({
      data: {
        title: entity.title,
        preview: entity.preview,
        content: entity.content
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: TextPostEntity['id'], entity: TextPostEntity): Promise<TextPostEntity> {
    const record = await this.clientService.text.update({
      where: {id},
      data: {
        title: entity.title,
        preview: entity.preview,
        content: entity.content
      }
    });

    return this.createEntityFromDocument(record);
  }
}
