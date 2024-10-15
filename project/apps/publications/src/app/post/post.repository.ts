import { ConflictException, Injectable } from '@nestjs/common';

import { BasePostgresRepository } from '@project/lib/core';
import { createMessage } from '@project/lib/shared/helpers';
import { PrismaClientService } from '@project/lib/publications/models';
import { Post, PostStatus } from '@project/lib/shared/app/types';
import { PostEntity } from './post.entity';
import { ErrorMessage } from './post.constant';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, PostEntity.fromObject)
  }

  public async findById(id: PostEntity['id']): Promise<PostEntity> {
    const record = await this.prismaClient.publication.findFirst({
      where: {
        id
      },
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tag: true
      }
    })

    if(!record) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument({
      ...record,
      commentCount: record.comments.length,
      likeCount: record.likes.length,
      tags: record.tag
    });
  }

  public async findByDraftStatus({sort, count}) {
    const records = await this.prismaClient.publication.findMany({
      where: {
        status: PostStatus.Draft
      },
      take: count,
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tag: true
      },
      orderBy: {
        publishedDate: sort
      }
    });

    return records.map((record) => this.createEntityFromDocument({
      ...record,
      tags: record.tag,
      commentCount: record.comments.length,
      likeCount: record.likes.length
    }));
  }

  public async find({type, tagName, userId, sort, count}): Promise<PostEntity[]> {
    const records = await this.prismaClient.publication.findMany({
      where: {
        userId: userId,
        type: type,
        status: PostStatus.Published,
        tag: {
          tags: {
            hasEvery: [tagName]
          }
        }
      },
      take: count,
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tag: true
      },
      orderBy: {
        publishedDate: sort
      }
    });

    return records.map((record) => this.createEntityFromDocument({
      ...record,
      tags: record.tag,
      commentCount: record.comments.length,
      likeCount: record.likes.length
    }));
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const newRecord = await this.prismaClient.publication.create({
      data: {
        type: entity.type,
        status: entity.status,
        userId: entity.userId,
        publishedDate: entity.publishedDate,
        repost: entity.repost,
        originalUserId: entity.originalUserId,
        originalPublicationId: entity.originalPublicationId,
        [entity.type]: {
          connect: {id: entity[entity.type].id}
        },
        tag: entity.tags && {
          connect: {id: entity.tags.id}
        }
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: PostEntity['id'], entity: PostEntity): Promise<PostEntity> {
    const record = await this.prismaClient.publication.update({
      where: {
        id
      },
      data: {
        status: entity.status,
        publishedDate: entity.publishedDate,
        tag: entity.tags && {
          connect: {id: entity.tags.id}
        }
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaClient.publication.delete({
      where: {
        id
      }
    })
  }
}
