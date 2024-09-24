import { Injectable } from '@nestjs/common';

import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { VideoPostEntity } from './video-post.entity';
import { VideoPostRepository } from './video-post.repository';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly videoPostRepository: VideoPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return await this.videoPostRepository.findById(id);
  }

  public async createPostContent(dto: CreateVideoPostDto) {
    const newVideoPost = new VideoPostEntity(dto);

    return await this.videoPostRepository.save(newVideoPost);
  }

  public async updatePostContent(id: string, dto: UpdateVideoPostDto) {
    const existVideoPost = await this.videoPostRepository.findById(id);
    let isExistVideoPostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(value !== 'undefined' && existVideoPost[key] !== value) {
        existVideoPost[key] = value;
        isExistVideoPostUpdated = true;
      }
    }

    if(isExistVideoPostUpdated) {
      return await this.videoPostRepository.update(id, existVideoPost);
    }

    return existVideoPost;
  }
}
