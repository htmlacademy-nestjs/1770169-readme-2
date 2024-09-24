import { Expose } from 'class-transformer';

export class QuotePostRdo {
  @Expose()
  public author: string;

  @Expose()
  public content: string;
}
