import { Injectable } from '@nestjs/common';

import { CreateTextPostDto } from './dto/create-text-post.dto';
import { TextPostEntity } from './text-post.entity';
import { TextPostRepository } from './text-post.repository';
import { UpdateTextPostDto } from './dto/update-text-post.dto';

@Injectable()
export class TextPostService {
  constructor(
    private readonly textPostRepository: TextPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return await this.textPostRepository.findById(id);
  }

  public async createPostContent(dto: CreateTextPostDto) {
    const newTextPost = new TextPostEntity(dto);

    return await this.textPostRepository.save(newTextPost);
  }

  public async updatePostContent(id: string, dto: UpdateTextPostDto) {
    const existTextPost = await this.textPostRepository.findById(id);
    let isExistTextPostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(value !== 'undefined' && existTextPost[key] !== value) {
        existTextPost[key] = value;
        isExistTextPostUpdated = true;
      }
    }

    if(isExistTextPostUpdated) {
      return await this.textPostRepository.update(id, existTextPost);
    }

    return existTextPost;
  }
}
