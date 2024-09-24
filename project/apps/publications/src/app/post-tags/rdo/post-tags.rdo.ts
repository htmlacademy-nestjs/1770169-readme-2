import { Expose } from 'class-transformer';

export class PostTagsRdo {
  @Expose()
  public tags: string[];
}
