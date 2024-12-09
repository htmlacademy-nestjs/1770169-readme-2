import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, IsNotEmpty, Length, Matches  } from 'class-validator';

import {
  AvatarProperty,
  EmailProperty,
  FullNameLength,
  FullNameProperty,
  PasswordLength,
  PasswordProperty
} from '../auth.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: FullNameProperty.DESCRIPTION,
    example: FullNameProperty.EXAMPLE
  })
  @IsString()
  @Length(FullNameLength.MIN, FullNameLength.MAX)
  @IsNotEmpty()
  public fullName: string;

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

  @ApiProperty({
    description: AvatarProperty.DESCRIPTION,
    example: AvatarProperty.EXAMPLE
  })
  @IsString()
  @Matches(/[^\\s]+(.*?)\\.(jpeg|png|JPEG|PNG)$/)
  public avatar?: string;
}
