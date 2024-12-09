import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty } from 'class-validator';

import { UserIdProperty } from '../like.constant';

export class LikeDTO {
  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId()
  @IsNotEmpty()
  public userId: string;
}
