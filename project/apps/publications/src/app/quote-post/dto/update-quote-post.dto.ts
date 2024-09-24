import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuotePostDto {
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
}
