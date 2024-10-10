import { ApiProperty } from '@nestjs/swagger';

import { PostStatus, PostType } from '@project/lib/shared/app/types';

export class CreatePostDto {
  @ApiProperty({
    enum: PostType,
    description: 'The type of blog post is one of five types: video, text, quote, photo, link.',
    example: 'video'
  })
  public type: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: 'The publication status is one of two states: published or draft.',
    example: 'published'
  })
  public status: PostStatus;

  @ApiProperty({
    description: 'A unique user ID.',
    example: '667c673deb3171fbdaa4ce26'
  })
  public userId: string;

  @ApiProperty({
    description: 'A valid link to a video page on the YouTube service.',
    example: 'https://www.youtube.com/watch?v=xBInF48M0F0'
  })
  public url: string;

  public description: string;

  public image: string;

  public author: string;

  public content: string;

  @ApiProperty({
    description: 'Title of the publication',
    example: 'Burabai Kazakhstan'
  })
  public title: string;

  public preview: string;

  @ApiProperty({
    description: 'Tags for the post.',
    example: '#painting#creativity#landscape#forest'
  })
  public tags?: string;
}
