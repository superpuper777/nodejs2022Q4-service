import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UUIDv4 } from 'uuid-v4-validator';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from '@/database/database.service';
import { NewUser } from './utils/createUser';
import { User } from '@/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.hasOwnProperty('login')) {
      throw new BadRequestException('Bad request. Try again');
    }
    if (!createUserDto.hasOwnProperty('password')) {
      throw new BadRequestException('Bad request. Try again');
    }
    {
      const uuid = uuidv4();
      const startVersion = 1;
      const creationTimestamp = Date.now();
      const lastUpdateTimestamp = creationTimestamp;
      const { password } = createUserDto;
      createUserDto.password = await bcrypt.hash(
        password,
        parseInt(process.env.CRYPT_SALT),
      );
      const newUser = new NewUser({
        id: uuid,
        ...createUserDto,
        version: startVersion,
        createdAt: creationTimestamp,
        updatedAt: lastUpdateTimestamp,
      });

      this.db.users.push(newUser);

      return newUser;
    }
  }

  findAll(): User[] {
    return this.db.users;
  }

  findOne(id: string): User {
    const isValid = UUIDv4.validate(id);
    const user = this.db.users.find((user) => user.id === id);

    if (!isValid) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (isValid && user) {
      return user;
    }
  }

  findOneByLogin(login: string): User {
    return this.db.users.find((user) => user.login === login);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const index = await this.db.users.findIndex((user) => user.id === id);
    const user = await this.db.users.find((user) => user.id === id);

    const newTimestamp = Date.now();
    const { oldPassword, newPassword } = updatePasswordDto;

    if (
      !UUIDv4.validate(id) ||
      (!updatePasswordDto.hasOwnProperty('oldPassword') &&
        !updatePasswordDto.hasOwnProperty('newPassword'))
    ) {
      throw new BadRequestException();
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // if (user.password !== oldPassword) {
    //   throw new ForbiddenException('Old password is wrong');
    // }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) throw new ForbiddenException('Old password is wrong');

    const updatedUser = new NewUser({
      ...user,
      version: ++user.version,
      password: await bcrypt.hash(
        newPassword,
        parseInt(process.env.CRYPT_SALT),
      ),
      updatedAt: newTimestamp,
    });

    this.db.users.splice(index, 1, updatedUser);

    return updatedUser;
  }

  remove(id: string) {
    const index = this.db.users.findIndex((user) => user.id === id);

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException('Bad request. Try again');
    }
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.db.users.splice(index, 1);
  }
}
