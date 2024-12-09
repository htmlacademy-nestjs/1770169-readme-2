import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';

import { OldPasswordProperty, PasswordLength, PasswordProperty } from '../auth.constant';

export class UpdateUserDTO {
  @ApiProperty({
    description: OldPasswordProperty.DESCRIPTION,
    example: OldPasswordProperty.EXAMPLE
  })
  @IsString()
  @Length(PasswordLength.MIN, PasswordLength.MAX)
  @IsNotEmpty()
  public oldPassword: string;

  @ApiProperty({
    description: PasswordProperty.DESCRIPTION,
    example: PasswordProperty.EXAMPLE
  })
  @IsString()
  @Length(PasswordLength.MIN, PasswordLength.MAX)
  @IsNotEmpty()
  public password: string;
}
