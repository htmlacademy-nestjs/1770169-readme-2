import { ApiProperty } from '@nestjs/swagger';

import { Expose, Type } from 'class-transformer';

import { UserRdo } from './../../../../../customers/src/app/auth/rdo/user.rdo';

export class CommentDto {
  @ApiProperty({
    description: 'A unique comment ID.',
    example: '17177772-33ba-42d8-a4ca-27758d30608e'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The text of the comment.',
    example: 'Красивый вид на озеро и горы).'
  })
  @Expose()
  public comment: string;

  @ApiProperty({
    description: 'The author of the comment.'
  })
  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @ApiProperty({
    description: 'Date the comment was created.',
    example: '2022-01-18T17:36:34.064Z'
  })
  @Expose()
  public createdAt: Date;
}
