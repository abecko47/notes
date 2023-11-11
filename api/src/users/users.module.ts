import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [PrismaService],
  imports: [PrismaModule],
})
export class UsersModule {}
