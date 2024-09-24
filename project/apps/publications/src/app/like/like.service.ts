import { ConflictException, Injectable } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { LikeDto } from './dto/like.dto';
import { PostService } from '../post/post.service';
import { PostStatus } from '@project/lib/shared/app/types';
import { ErrorMessage } from './like.constant';

@Injectable()
export class LikeService {
  constructor (
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService
  ) {}
  public async togglePostLike(postId: string, dto: LikeDto) {
    const existsLike = await this.likeRepository.findByPostId(postId);

    if (existsLike) {
      return await this.likeRepository.delete(existsLike.id);
    }
    const existsPost = await this.postService.getPostById(postId);

    if (existsPost.status !== PostStatus.Published) {
      throw new ConflictException(ErrorMessage.POST_STATUS_ERROR_MESSAGE)
    }
    const newLikePost = LikeEntity.fromDto(existsPost.id, dto);

    return await this.likeRepository.save(newLikePost);
  }
}
