import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import { ExtendUser } from '@project/lib/shared/app/types';
import { Entity } from '@project/lib/core';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements ExtendUser, Entity<string> {
  public id: string;
  public username: string;
  public email: string;
  public password: string;
  public createdDate?: Date;
  public avatar?: string;

  constructor(user: ExtendUser) {
    this.populate(user);
  }

  public toObject() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
    }
  }

  public populate(user: ExtendUser) {
    this.username = user.username;
    this.email = user.email;
    this.createdDate = user.createdDate;
  }

  public setPassword(password: string) {
    const salt = genSaltSync(SALT_ROUNDS);
    this.password = hashSync(password, salt);
    return this;
  }

  public async comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}
