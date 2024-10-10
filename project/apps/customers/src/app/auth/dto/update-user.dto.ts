import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The user old password.',
    example: '123456'
  })
  public oldPassword: string;

  @ApiProperty({
    description: 'The user new password.',
    example: '123456'
  })
  public password: string;
}
