import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty } from 'class-validator';

import { UserIdProperty, UserIdValidationMessage } from '../like.constant';

export class LikeDTO {
  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId({message: UserIdValidationMessage.TYPE})
  @IsNotEmpty({message: UserIdValidationMessage.REQUIRED})
  public userId: string;
}
