import { UsersService } from '@/users/users.service';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/entities/user.entity';
import { NewUser } from '@/users/utils/createUser';
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
      // const { password, ...result } = user;
      // return result;
      return user;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async login(user: User) {
    console.log(user);
    const { id, login, password } = user;
    if (login && password) {
      //|| (typeof password === 'string' && typeof login === 'string')
      return {
        access_token: await this.jwtService.signAsync(
          { userId: id, login },
          {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
          },
        ),

        fresh_token: await this.jwtService.signAsync(
          { userId: id, login },
          {
            secret: process.env.JWT_SECRET_REFRESH_KEY,
            expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
          },
        ),
      };
    } else throw new BadRequestException();
  }

  async refresh(body: { refreshToken: string }) {
    const { refreshToken } = body;
    console.log(refreshToken);
    console.log(this.jwtService.verify(refreshToken));
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    try {
      const { userId, login } = this.jwtService.verify(refreshToken);
      const user = new NewUser({ id: userId, login });

      return await this.login(user);
    } catch {
      throw new ForbiddenException('Refresh token is outdated or invalid');
    }
  }
}
