import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Title of the publication',
    example: 'Burabai Kazakhstan'
  })
  public title: string;

  @ApiProperty({
    description: 'A valid link to a video page on the YouTube service.',
    example: 'https://www.youtube.com/watch?v=xBInF48M0F0'
  })
  public url: string;
}
