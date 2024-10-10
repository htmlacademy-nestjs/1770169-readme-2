import { ApiProperty } from '@nestjs/swagger';

export class CreateTextPostDto {
  @ApiProperty({
    description: 'Title of the publication.',
    example: 'Artificial intelligence still deprives people of work.'
  })
  public title: string;

  @ApiProperty({
    description: 'Announcement of the publication.',
    example: 'The scientific journal has used AI to create scientific articles.'
  })
  public preview: string;

  @ApiProperty({
    description: 'The content of a text publication.',
    example: `The whole point is due to the use of generative artificial intelligence (AI) to create scientific articles.
      The experiment that the magazine went to caused criticism and indignation not only from the scientific community and readers, but also from former authors of the publication, editors and two founders.`
  })
  public content: string;
}
