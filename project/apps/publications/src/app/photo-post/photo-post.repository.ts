import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { PhotoPost } from '@project/lib/shared/app/types';
import { PhotoPostEntity } from './photo-post.entity';
import { ErrorMessage } from './photo-post.constant';

@Injectable()
export class PhotoPostRepository extends BasePostgresRepository<PhotoPostEntity, PhotoPost> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, PhotoPostEntity.fromObject);
  }

  public async findById(id: PhotoPostEntity['id']): Promise<PhotoPostEntity> {
      const record = await this.clientService.photo.findFirst({
        where: {id}
      });

      if(!record) {
        throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
      }


      return this.createEntityFromDocument(record);
  }

  public async save(entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const newRecord = await this.clientService.photo.create({
      data: {image: entity.image}
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: PhotoPostEntity['id'], entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const record = await this.clientService.photo.update({
      where: {id},
      data: {image: entity.image}
    });

    return this.createEntityFromDocument(record);
  }
}
