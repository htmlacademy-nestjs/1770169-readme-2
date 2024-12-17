import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { HasMimeType, MaxFileSize } from 'nestjs-form-data';

import { PhotoProperty, PhotoValidationMessage } from '../photo-post.constant';

export class CreatePhotoPostDTO {
  @ApiProperty({
    description: PhotoProperty.DESCRIPTION,
    example: PhotoProperty.EXAMPLE
  })
  @IsString({message: PhotoValidationMessage.TYPE})
  @MaxFileSize(1E6, {message: PhotoValidationMessage.SIZE})
  @HasMimeType(['image/jpeg', 'image/png'])
  public image: string;
}
