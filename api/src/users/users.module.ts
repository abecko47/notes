import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
