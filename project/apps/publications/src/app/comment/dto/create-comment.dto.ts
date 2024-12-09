import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

import { CommentLength, ContentProperty, UserIdProperty } from '../comment.constant';

export class CreateCommentDTO {
  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @IsString()
  @Length(CommentLength.MIN, CommentLength.MAX)
  @IsNotEmpty()
  public content: string;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId()
  @IsNotEmpty()
  public userId: string;
}
