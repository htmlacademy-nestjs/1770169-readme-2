import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhotoPostDto {
  @ApiProperty({
    description: 'Image in jpg or png format.',
    example: 'cat.jpg'
  })
  public image?: string;
}
