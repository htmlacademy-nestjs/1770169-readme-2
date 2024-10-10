import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { Comment } from '@project/lib/shared/app/types';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';
import { ErrorMessage } from './comment.constant';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    protected readonly clientService: PrismaClientService
  ) {
    super(clientService, CommentEntity.fromObject);
  }

  public async findById(id: CommentEntity['id']): Promise<CommentEntity> {
    const record = await this.clientService.comment.findFirst({
      where: {id}
    });

    if(!record) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_POST_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: PostEntity['id'], {count}): Promise<CommentEntity[]> {
    const records = await this.clientService.comment.findMany({
      where: {
        publicationId: postId
      },
      take: count
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const newRecord = await this.clientService.comment.create({
      data: {
        content: entity.content,
        userId: entity.userId,
        publicationId: entity.publicationId
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async deleteById(id: CommentEntity['id']): Promise<void> {
    await this.clientService.comment.delete({
      where: {id}
    });
  }
}
