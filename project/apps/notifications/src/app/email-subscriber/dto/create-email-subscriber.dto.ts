import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailSubscriberDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
