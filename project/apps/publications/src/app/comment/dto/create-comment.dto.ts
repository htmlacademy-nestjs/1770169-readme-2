import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The text of the comment.',
    example: 'Красивый вид на озеро и горы).'
  })
  public content: string;

  @ApiProperty({
    description: 'A unique user ID.',
    example: '667c673deb3171fbdaa4ce26'
  })
  public userId: string;
}
