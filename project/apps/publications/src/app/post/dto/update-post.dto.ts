import { ApiProperty } from '@nestjs/swagger';

import { PostStatus } from '@project/lib/shared/app/types';

export class UpdatePostDto {
  @ApiProperty({
    description: 'The publication status is one of two states: published or draft.',
    example: 'published'
  })
  public status?: PostStatus;

  @ApiProperty({
    description: 'The publication publication date.',
    example: '2022-01-18T17:36:34.064Z'
  })
  public publishedDate?: Date;

  @ApiProperty({
    description: 'Valid URL.',
    example: 'https://nestjs.com/'
  })
  public url?: string;

  @ApiProperty({
    description: 'Description of the link.',
    example: 'A progressive framework for creating efficient, reliable and scalable server applications.'
  })
  public description?: string;

  @ApiProperty({
    description: 'Image in jpg or png format.',
    example: 'cat.jpg'
  })
  public image?: string;

  @ApiProperty({
    description: 'The author of the quote.',
    example: 'Fyodor Dostoevsky'
  })
  public author?: string;

  @ApiProperty({
    description: 'The contents of the quote publication.',
    example: 'One must love life more than the very meaning of life!'
  })
  public content?: string;

  @ApiProperty({
    description: 'Title of the publication.',
    example: 'Artificial intelligence still deprives people of work.'
  })
  public title?: string;

  @ApiProperty({
    description: 'Announcement of the publication.',
    example: 'The scientific journal has used AI to create scientific articles.'
  })
  public preview?: string;

  @ApiProperty({
    description: 'Tags for the post.',
    example: '#painting#creativity#landscape#forest'
  })
  public tags?: string;
}
