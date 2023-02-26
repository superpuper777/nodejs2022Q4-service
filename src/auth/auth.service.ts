import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
