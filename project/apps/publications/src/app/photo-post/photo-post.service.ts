import { Injectable } from '@nestjs/common';

import { CreatePhotoPostDto } from './dto/create-photo-post.dto';
import { PhotoPostEntity } from './photo-post.entity';
import { PhotoPostRepository } from './photo-post.repository';
import { UpdatePhotoPostDto } from './dto/update-photo-post.dto';

@Injectable()
export class PhotoPostService {
  constructor(
    private readonly photoPostRepository: PhotoPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return await this.photoPostRepository.findById(id);
  }

  public async createPostContent(dto: CreatePhotoPostDto) {
    const newPhotoPost = new PhotoPostEntity(dto);

    return await this.photoPostRepository.save(newPhotoPost);
  }

  public async updatePostContent(id: string, dto: UpdatePhotoPostDto) {
    const existPhotoPost = await this.photoPostRepository.findById(id);

    if(dto.image !== 'undefined' && existPhotoPost.image !== dto.image) {
      existPhotoPost.image = dto.image;

      return await this.photoPostRepository.update(id, existPhotoPost);
    }

    return existPhotoPost;
  }
}
