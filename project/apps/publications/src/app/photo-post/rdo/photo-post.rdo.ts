import { Expose } from 'class-transformer';

export class PhotoPostRdo {
  @Expose()
  public image: string;
}