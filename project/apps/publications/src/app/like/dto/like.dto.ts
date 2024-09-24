import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
  @ApiProperty({
    description: 'A unique user ID.',
    example: '667c673deb3171fbdaa4ce26'
  })
  public userId: string;
}
