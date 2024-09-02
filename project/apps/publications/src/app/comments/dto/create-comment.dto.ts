import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The text of the comment.',
    example: 'Красивый вид на озеро и горы).'
  })
  public content: string;

  public userId: string;
}
