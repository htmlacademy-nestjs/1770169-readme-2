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

  public async findByPostId(id: string) {
    const record = await this.clientService.like.findFirst({
      where: {
        publicationId: id
      }
    });

    return this.createEntityFromDocument(record);
  }
}
