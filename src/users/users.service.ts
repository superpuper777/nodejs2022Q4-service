import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUIDv4 } from 'uuid-v4-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
// import { DatabaseService } from '@/database/database.service';
// import { NewUser } from './utils/createUser';
// import { IUser } from '@/users/entities/user.entity';
import { User } from '@/entity/User';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    // private db: DatabaseService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.hasOwnProperty('login')) {
      throw new BadRequestException('Bad request. Try again');
    }
    if (!createUserDto.hasOwnProperty('password')) {
      throw new BadRequestException('Bad request. Try again');
    }

    const createdUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(createdUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const isValid = UUIDv4.validate(id);
    // const user = this.db.users.find((user) => user.id === id);
    const user = await this.usersRepository.findOneBy({ id });
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

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
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

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    user.password = newPassword;
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    // const index = this.db.users.findIndex((user) => user.id === id);
    const user = await this.usersRepository.findOneBy({ id });
    if (!UUIDv4.validate(id)) {
      throw new BadRequestException('Bad request. Try again');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
  }
}
