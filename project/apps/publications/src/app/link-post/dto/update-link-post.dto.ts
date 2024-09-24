import { ApiProperty } from '@nestjs/swagger';

export class UpdateLinkPostDto {
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
}
