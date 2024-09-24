import { Expose } from 'class-transformer';

export class LinkPostRdo {
  @Expose()
  public url: string;

  @Expose()
  public description: string;
}
