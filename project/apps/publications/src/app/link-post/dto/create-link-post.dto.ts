import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

import {
  DescriptionProperty,
  DescriptionValidationMessage,
  MAX_DESCRIPTION_LENGTH,
  URLProperty,
  URLValidationMessage
} from '../link-post.constant';

export class CreateLinkPostDTO {
  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  @IsUrl({}, {message: URLValidationMessage.TYPE})
  @IsNotEmpty({message: URLValidationMessage.REQUIRED})
  public url: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  @IsString({message: DescriptionValidationMessage.TYPE})
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: DescriptionValidationMessage.LENGTH})
  public description: string;
}
