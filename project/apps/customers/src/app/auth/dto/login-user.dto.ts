import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { EmailProperty, PasswordLength, PasswordProperty } from '../auth.constant';

export class LoginUserDTO {
  @ApiProperty({
    description: EmailProperty.DESCRIPTION,
    example: EmailProperty.EXAMPLE
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: PasswordProperty.DESCRIPTION,
    example: PasswordProperty.EXAMPLE
  })
  @IsString()
  @Length(PasswordLength.MIN, PasswordLength.MAX)
  @IsNotEmpty()
  public password: string;
}
