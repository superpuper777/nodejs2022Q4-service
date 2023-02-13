import { Exclude } from 'class-transformer';
import { User } from '@/users/entities/user.entity';

export class NewUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
