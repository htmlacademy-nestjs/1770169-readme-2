import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

import { DescriptionProperty, MAX_DESCRIPTION_LENGTH, URLProperty } from '../link-post.constant';

export class CreateLinkPostDTO {
  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  @IsUrl()
  @IsNotEmpty()
  public url: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  @IsString()
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: 'Длина должна быть не более 300 символов.'})
  public description: string;
}
