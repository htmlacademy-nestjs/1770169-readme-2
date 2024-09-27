import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { BasePostgresRepository } from '@project/lib/core';
import { LikeEntity } from './like.entity';
import { Like } from '@project/lib/shared/app/types';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, LikeEntity.fromObject)
  }

  public async save(entity: LikeEntity) {
    const record = await this.clientService.like.create({
      data: {
        userId: entity.userId,
        publicationId: entity.publicationId
      }
    });
    entity.id = record.id;

    return this.createEntityFromDocument(entity);
  }

  public async findByUserAndPostId(userId: string, postId: string) {
    const record = await this.clientService.like.findFirst({
      where: {
        userId: userId,
        publicationId: postId
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async delete(id: string) {
    await this.clientService.like.delete({
      where: {id}
    });
  }
}
