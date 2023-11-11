import {Controller, Get, Post, UseGuards, Request, Body} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {User} from "@prisma/client";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: User, @Request() req): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('home')
  getProfile(@Request() req) {
    return req.user;
  }

}
