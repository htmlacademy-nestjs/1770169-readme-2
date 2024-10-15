import dayjs from 'dayjs';

import { ConflictException, Injectable } from '@nestjs/common';

import { PostType } from '@project/lib/shared/app/types';
import { LinkPostService } from '../link-post/link-post.service';
import { PostTagService } from '../post-tags/post-tags.service';
import { VideoPostService } from '../video-post/video-post.service';
import { PostRepository } from './post.repository';
import { TextPostService } from '../text-post/text-post.service';
import { QuotePostService } from '../quote-post/quote-post.service';
import { PhotoPostService } from '../photo-post/photo-post.service';
import { PostEntity } from './post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostTagsEntity } from '../post-tags/post-tags.entity';
import { createMessage, removeEmptyKeys } from '@project/lib/shared/helpers';
import { ErrorMessage } from './post.constant';

type PostContent = {
  [PostType.Video]: VideoPostService,
  [PostType.Link]: LinkPostService,
  [PostType.Text]: TextPostService,
  [PostType.Quote]: QuotePostService,
  [PostType.Photo]: PhotoPostService
}

@Injectable()
export class PostService {
  private readonly postContent: PostContent = {
    [PostType.Video]: this.videoPostService,
    [PostType.Link]: this.linkPostService,
    [PostType.Text]: this.textPostService,
    [PostType.Quote]: this.quotePostService,
    [PostType.Photo]: this.photoPostService
  }

  constructor(
    private readonly postTagsService: PostTagService,
    private readonly postRepository: PostRepository,
    private readonly videoPostService: VideoPostService,
    private readonly linkPostService: LinkPostService,
    private readonly textPostService: TextPostService,
    private readonly quotePostService: QuotePostService,
    private readonly photoPostService: PhotoPostService,
  ) {}

  public async createPost(dto: CreatePostDTO) {
    let tags: PostTagsEntity;

    if(dto.tags) {
      tags = await this.postTagsService.createTags({tags: dto.tags});
    }
    const newPostContent = await this.postContent[dto.type].createPostContent(dto);
    const post = {
      type: dto.type,
      status: dto.status,
      userId: dto.userId,
      [dto.type]: newPostContent,
      tags
    }
    const newPost = new PostEntity(post);

    return await this.postRepository.save(newPost);
  }

  public async repostPost(id: string, userId: string) {
    const existsPost = await this.postRepository.findById(id);

    if(existsPost.repost) {
      throw new Error(ErrorMessage.REPOST_ERROR_MESSAGE);
    }

    const post = {
      type: existsPost.type,
      status: existsPost.status,
      userId,
      [existsPost.type]: existsPost[existsPost.type],
      tags: existsPost.tags,
      repost: true,
      publishedDate: dayjs().toDate(),
      originalUserId: existsPost.userId,
      originalPublicationId: existsPost.id
    }
    const newPost = new PostEntity(post);
    return await this.postRepository.save(newPost);
  }

  public async getPostById(id: string) {
    return await this.postRepository
      .findById(id)
      .then((record) => removeEmptyKeys(record));
  }

  public async getAllPosts({type, tagName, userId, sort, count}) {
    return await this.postRepository
      .find({type, tagName, userId, sort, count})
      .then((records) => records
        .map((record) => removeEmptyKeys(record)));
  }

  public async getPostsByDraftStatus({sort, count}) {
    return await this.postRepository
      .findByDraftStatus({sort, count})
      .then((records) => records
        .map((record) => removeEmptyKeys(record)));
  }

  public async updatePostById(id: string, dto: UpdatePostDTO) {
    const existsPost = await this.postRepository.findById(id).then((record) => removeEmptyKeys(record));
    let newTags = undefined;
    let isExistsPostUpdated = false;

    await this.postContent[existsPost.type].updatePostContent(existsPost[existsPost.type].id, dto);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== 'undefined') {
        if (key === 'tags') {
          if (existsPost.tags) {
            await this.postTagsService.updateTags(existsPost.tags.id, {tags: dto.tags});
          } else {
            newTags = await this.postTagsService.createTags({tags: dto.tags});
            isExistsPostUpdated = true;
          }
          continue;
        }

        if (existsPost[key] !== value) {
          existsPost[key] = value;
          isExistsPostUpdated = true;
        }
      }
    }

    if (isExistsPostUpdated) {
      existsPost.tags = newTags;
      return await this.postRepository.update(existsPost.id, existsPost);
    }

    return existsPost;
  }

  public async deletePostById(id: string) {
    try {
      await this.postRepository.delete(id);
    } catch {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
  }
}
