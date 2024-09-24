import { Injectable } from '@nestjs/common';

import { CreatePostTagDto } from './dto/create-post-tags.dto';
import { UpdatePostTagDto } from './dto/update-post-tags.dto';
import { PostTagsEntity } from './post-tags.entity';
import { PostTagsRepository } from './post-tags.repository';

@Injectable()
export class PostTagService {
  constructor(
    private readonly postTagsRepository: PostTagsRepository
  ) {}

  public async getTagsById(id: string): Promise<PostTagsEntity> {
    return await this.postTagsRepository.findById(id);
  }

  public async createTags(dto: CreatePostTagDto) {
    const newTags = PostTagsEntity.fromDto(dto);

    return await this.postTagsRepository.save(newTags);
  }

  public async updateTags(id: string, dto: UpdatePostTagDto) {
    const existTags = await this.postTagsRepository.findById(id);

    if (dto.tags !== 'undefined') {
      existTags.tags = PostTagsEntity.toUniqueArray(dto.tags);

      return await this.postTagsRepository.update(id, existTags);
    }

    return existTags;
  }
}
