import { IsDate, IsEmail, IsNotEmpty } from 'class-validator'

export class SendPostsDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsDate()
  @IsNotEmpty()
  public lastNotification?: Date;
}
