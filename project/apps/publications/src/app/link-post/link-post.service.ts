import { Injectable } from '@nestjs/common';

import { CreateLinkPostDto } from './dto/create-link-post.dto';
import { LinkPostEntity } from './link-post.entity';
import { LinkPostRepository } from './link-post.repository';
import { UpdateLinkPostDto } from './dto/update-link-post.dto';

@Injectable()
export class LinkPostService {
  constructor(
    private readonly linkPostRepository: LinkPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return await this.linkPostRepository.findById(id);
  }

  public async createPostContent(dto: CreateLinkPostDto) {
    const newLinkPost = new LinkPostEntity(dto);

    return await this.linkPostRepository.save(newLinkPost);
  }

  public async updatePostContent(id: string, dto: UpdateLinkPostDto) {
    const existLinkPost = await this.linkPostRepository.findById(id);
    let isExistLinkPostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(value !== 'undefined' && existLinkPost[key] !== value) {
        existLinkPost[key] = value;
        isExistLinkPostUpdated = true;
      }
    }

    if(isExistLinkPostUpdated) {
      return await this.linkPostRepository.update(id, existLinkPost);
    }

    return existLinkPost;
  }
}
