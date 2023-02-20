import { Exclude } from 'class-transformer';
import { IUser } from '@/users/entities/user.entity';

export class NewUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
