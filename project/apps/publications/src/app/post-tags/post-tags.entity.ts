import { Entity } from '@project/lib/core';
import { PostTags } from '@project/lib/shared/app/types';
import { CreatePostTagDto } from './dto/create-post-tags.dto';

export class PostTagsEntity implements PostTags, Entity<string, PostTags> {
  public id?: string;
  public tags: string[];

  public populate(data: PostTags) {
    this.id = data.id,
    this.tags = data.tags;

    return this;
  }

  public toObject(): PostTags {
    return {
      id: this.id,
      tags: this.tags
    }
  }

  static fromObject(data: PostTags) {
    return new PostTagsEntity().populate(data);
  }

  static fromDto(dto: CreatePostTagDto) {
    const entity = new PostTagsEntity();
    entity.tags = this.toUniqueArray(dto.tags)

    return entity;
  }

  static toUniqueArray(tag: string) {
    const tagList = tag
      .split(/\s*#\s*/)
      .filter((element) => element)
      .map((element) => element
        .replace(/(.)/,'#$1')
        .toLowerCase()
      );

    return [...new Set(tagList).values()];
  }
}
