import { Expose } from 'class-transformer';

export class TextPostRdo {
  @Expose()
  public title: string;

  @Expose()
  public preview: string;

  @Expose()
  public content: string;
}
