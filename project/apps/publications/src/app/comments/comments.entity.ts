import { Entity } from '@project/lib/core';

import { Comment, User } from '@project/lib/shared/app/types';

export class CommentsEntity implements Comment, Entity<string> {
  public id?: string;
  public content: string;
  public user: User;
  public createdAt?: Date;

  constructor(comment: Comment) {
    if (!comment.content) {
      throw new Error('Comment content is required');
    }
    this.populate(comment);
  }

  public toObject() {
    return {
      id: this.id,
      content: this.content,
      user: this.user,
      createdAt: this.createdAt
    }

  }

  public populate(comment: Comment) {
    this.id = comment.id,
    this.content = comment.content,
    this.user = comment.user
    this.createdAt = comment.createdAt
  }
}
