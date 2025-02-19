import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePublicationsSubscriberDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
 }
