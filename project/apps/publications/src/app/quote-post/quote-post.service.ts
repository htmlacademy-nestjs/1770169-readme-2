import { Injectable } from '@nestjs/common';

import { CreateQuotePostDto } from './dto/create-quote-post.dto';
import { QuotePostEntity } from './quote-post.entity';
import { QuotePostRepository } from './quote-post.repository';
import { UpdateQuotePostDto } from './dto/update-quote-post.dto';

@Injectable()
export class QuotePostService {
  constructor(
    private readonly quotePostRepository: QuotePostRepository
  ) {}

  public async getPostContentById(id: string) {
    return await this.quotePostRepository.findById(id);
  }

  public async createPostContent(dto: CreateQuotePostDto) {
    const newQuotePost = new QuotePostEntity(dto);

    return await this.quotePostRepository.save(newQuotePost);
  }

  public async updatePostContent(id: string, dto: UpdateQuotePostDto) {
    const existQuotePost = await this.quotePostRepository.findById(id);
    let isExistQuotePostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(value !== 'undefined' && existQuotePost[key] !== value) {
        existQuotePost[key] = value;
        isExistQuotePostUpdated = true;
      }
    }

    if(isExistQuotePostUpdated) {
      return await this.quotePostRepository.update(id, existQuotePost);
    }

    return existQuotePost;
  }
}
