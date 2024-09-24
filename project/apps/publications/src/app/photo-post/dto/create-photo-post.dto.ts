import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Image in jpg or png format.',
    example: 'cat.jpg'
  })
  public image: string;
}
