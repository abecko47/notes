import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { username, createdAt, id } = user;
      return {
        username,
        createdAt,
        id,
      };
    }
    return null;
  }

  async login(user: Omit<User, 'password'>): Promise<{ accessToken: string }> {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
