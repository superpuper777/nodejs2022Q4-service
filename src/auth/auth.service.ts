import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async login(user: any) {
    const { id, login } = user;

    return {
      access_token: await this.jwtService.signAsync(
        { userId: id, login },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
    };
  }
}
