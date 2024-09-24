import { Expose, Transform, Type } from 'class-transformer';

import { PostTagsRdo } from '../../post-tags/rdo/post-tags.rdo';
import { PostStatus, PostType } from '@project/lib/shared/app/types';
import { LinkPostRdo } from '../../link-post/rdo/link-post.rdo';
import { PhotoPostRdo } from '../../photo-post/rdo/photo-post.rdo';
import { QuotePostRdo } from '../../quote-post/rdo/quote-post.rdo';
import { VideoPostRdo } from '../../video-post/rdo/video-post.rdo';
import { TextPostRdo } from '../../text-post/rdo/text-post.rdo';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public type: `${PostType}`;

  @Expose()
  public status: `${PostStatus}`;

  @Expose()
  public repost: boolean;

  @Expose()
  public publishedDate: string;

  @Expose()
  public originalUserId: string;

  @Expose()
  public originalPublicationId: string;

  @Expose()
  public likeCount: number;

  @Expose()
  public commentCount: number;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => LinkPostRdo)
  public link: LinkPostRdo;

  @Expose()
  @Type(() => PhotoPostRdo)
  public photo: PhotoPostRdo;

  @Expose()
  @Type(() => QuotePostRdo)
  public quote: QuotePostRdo;

  @Expose()
  @Type(() => VideoPostRdo)
  public video: VideoPostRdo;

  @Expose()
  @Type(() => TextPostRdo)
  public text: TextPostRdo;

  @Expose()
  @Type(() => PostTagsRdo)
  @Transform(({value}) => value && [...value.tags])
  public tags: string[];
}
