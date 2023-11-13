import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './auth/dto/LoginUser.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersDecorator } from './users/users.decorator';
import { UserDto } from './users/dto/User.dto';
import { Public } from './public.decorator';
import { LoginResponseDtoDto } from './auth/dto/LoginResponse.dto';

@ApiTags('Main')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({
    description: 'Login and get access token.',
    type: LoginResponseDtoDto,
    isArray: false,
  })
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @UsersDecorator() user: UserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(user);
  }

  @Public()
  @ApiOkResponse({
    description: 'Register and get access token.',
    type: LoginResponseDtoDto,
    isArray: false,
  })
  @Post('auth/register')
  async register(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.register(loginUserDto);
  }
}
