import { PostType } from '@prisma/client';
import { SortType } from '@project/lib/shared/app/types';
import { IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_MAX_POST_COUNT } from '../post.constant';

export class PostQuery {
  @IsMongoId()
  @IsOptional()
  public sortByUserId?: string;

  @IsEnum(PostType)
  @IsOptional()
  public sortByPostType?: PostType;

  @IsString()
  @IsOptional()
  public sortByTagName?: string;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortByDate: SortType = SortType.Desc;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortByLikes: SortType = SortType.Desc;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortByRating: SortType = SortType.Desc;

  @Transform(({value}) => +value || DEFAULT_MAX_POST_COUNT)
  @IsNumber()
  @IsOptional()
  public takePostsCount: number;

  @Transform(({value}) => +value)
  @IsNumber()
  @IsOptional()
  public currentPage: number;
}
