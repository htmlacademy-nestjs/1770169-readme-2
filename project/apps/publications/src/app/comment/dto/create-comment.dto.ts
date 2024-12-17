import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  CommentLength,
  ContentProperty,
  ContentValidationMessage,
  UserIdProperty,
  UserIdValidationMessage
} from '../comment.constant';

export class CreateCommentDTO {
  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @IsString({message: ContentValidationMessage.TYPE})
  @Length(CommentLength.MIN, CommentLength.MAX, {message: ContentValidationMessage.LENGTH})
  @IsNotEmpty({message: ContentValidationMessage.REQUIRED})
  public content: string;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId({message: UserIdValidationMessage.TYPE})
  @IsNotEmpty({message: UserIdValidationMessage.REQUIRED})
  public userId: string;
}
