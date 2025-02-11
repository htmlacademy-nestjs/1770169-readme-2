import { Entity } from '@project/lib/core';
import { Subscriber } from '@project/lib/shared/app/types';

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;

  public populate(data: Subscriber) {
    this.id = data.id ?? undefined;
    this.email = data.email;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email
    }
  }

  static fromObject(data: Subscriber) {
    return new EmailSubscriberEntity().populate(data)
  }
}
