import { User } from './user.interface';

export interface Comment {
  id?: string;
  content: string;
  user: User;
  createdAt?: Date;
}
