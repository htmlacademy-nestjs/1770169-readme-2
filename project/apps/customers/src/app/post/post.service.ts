import { Injectable } from '@nestjs/common';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { CreatePostDTO } from '@project/lib/shared/app/dto';
import { RabbitRouting } from '@project/lib/shared/app/types';

import { CUSTOMERS_SUBSCRIBE } from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
  ) {}

  public async getPosts(dto: CreatePostDTO) {
    return this.rabbitClient.publish<CreatePostDTO>(
      CUSTOMERS_SUBSCRIBE.EXCHANGE,
      RabbitRouting.GetPublicationsCount,
      dto
    )
  };
}
