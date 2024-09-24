import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { VideoPost } from '@project/lib/shared/app/types';
import { VideoPostEntity } from './video-post.entity';
import { ErrorMessage } from './video-post.constant';

@Injectable()
export class VideoPostRepository extends BasePostgresRepository<VideoPostEntity, VideoPost> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, VideoPostEntity.fromObject);
  }

  public async findById(id: VideoPostEntity['id']): Promise<VideoPostEntity> {
    const record = await this.clientService.video.findFirst({
      where: {id}
    });

    if(!record) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: VideoPostEntity): Promise<VideoPostEntity> {
    const newRecord = await this.clientService.video.create({
      data: {
        title: entity.title,
        url: entity.url
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: VideoPostEntity['id'], entity: VideoPostEntity): Promise<VideoPostEntity> {
    const record = await this.clientService.video.update({
      where: {id},
      data: {
        title: entity.title,
        url: entity.url
      }
    });

    return this.createEntityFromDocument(record);
  }
}
