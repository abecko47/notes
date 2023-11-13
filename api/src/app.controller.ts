import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginUserDto } from './auth/dto/LoginUser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersDecorator } from './users/users.decorator';
import { UserDto } from './users/dto/User.dto';
import { Public } from './public.decorator';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @UsersDecorator() user: UserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(user);
  }

  @Public()
  @Post('auth/register')
  async register(
      @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.register(loginUserDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@UsersDecorator() user: UserDto) {
    return user;
  }
}
