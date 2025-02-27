import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendLastPostsDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
