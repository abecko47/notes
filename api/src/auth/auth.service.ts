import {BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    // In real world must be bcrypt()
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

  async register(user: Pick<User, 'username' | 'password'>): Promise<{ accessToken: string }> {
    const findDuplicateUsername = await this.prismaService.user.findMany({
      where: {
        username: user.username
      }
    });

    if (findDuplicateUsername.length > 0) {
      throw new BadRequestException();
    }

    const newUser = await this.prismaService.user.create({
      data: user
    })

    return {
      accessToken: this.jwtService.sign(newUser),
    };
  }
}
