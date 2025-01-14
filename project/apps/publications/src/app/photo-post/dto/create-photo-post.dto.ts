import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { HasMimeType, MaxFileSize } from 'nestjs-form-data';

import {
  FORMAT_MESSAGE,
  ImageFormat,
  MAX_SIZE,
  PhotoProperty,
  REQUIRED_MESSAGE,
  SIZE_MESSAGE,
  TYPE_MESSAGE
} from '../photo-post.constant';

export class CreatePhotoPostDTO {
  @ApiProperty({
    description: PhotoProperty.DESCRIPTION,
    example: PhotoProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  @MaxFileSize(MAX_SIZE, {message: SIZE_MESSAGE})
  @HasMimeType([ImageFormat.JPEG, ImageFormat.PNG], {message: FORMAT_MESSAGE})
  public image: string;
}
