import { ConflictException, Injectable } from '@nestjs/common';

import { createMessage } from '@project/lib/shared/helpers';

import { ErrorMessage } from './comment.constant';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService
  ) {}

  public async getCommentById(id: string) {
    return await this.commentRepository.findById(id);
  }

  public async getCommentsByPostId(postId: string, {count}) {
    return await this.commentRepository.findByPostId(postId, {count});
  }

  public async createComment(postId: string, dto: CreateCommentDto) {
    const existsPost = await this.postService.getPostById(postId);
    const newComment = CommentEntity.fromDto(existsPost.id, dto);

    return await this.commentRepository.save(newComment);
  }

  public async deleteCommentById(id: string) {
    try {
      await this.commentRepository.deleteById(id);
    } catch {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
  }
}
