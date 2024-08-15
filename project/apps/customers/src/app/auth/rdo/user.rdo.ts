import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string

  @Expose()
  public createdDate: string;

  @Expose()
  public avatar: string;

  @Expose()
  public postCount: number;

  @Expose()
  public subscribeCount: number;
}
