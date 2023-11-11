import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginUserDto } from './auth/dto/LoginUser.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersDecorator } from './users/users.decorator';
import { UserDto } from './users/dto/User.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(
    @UsersDecorator() @Body() user: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@UsersDecorator() user: UserDto) {
    return user;
  }
}
