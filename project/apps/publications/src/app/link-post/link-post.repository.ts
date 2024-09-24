import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { LinkPost } from '@project/lib/shared/app/types';
import { LinkPostEntity } from './link-post.entity';
import { ErrorMessage } from './link-post.constant';

@Injectable()
export class LinkPostRepository extends BasePostgresRepository<LinkPostEntity, LinkPost> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, LinkPostEntity.fromObject);
  }

  public async findById(id: LinkPostEntity['id']): Promise<LinkPostEntity> {
    const record = await this.clientService.link.findFirst({
      where: {id}
    });

    if(!record) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: LinkPostEntity): Promise<LinkPostEntity> {
    const newRecord = await this.clientService.link.create({
      data: {
        description: entity.description,
        url: entity.url
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: LinkPostEntity['id'], entity: LinkPostEntity): Promise<LinkPostEntity> {
    const record = await this.clientService.link.update({
      where: {id},
      data: {
        description: entity.description,
        url: entity.url
      }
    });

    return this.createEntityFromDocument(record);
  }
}
