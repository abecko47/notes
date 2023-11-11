import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  imports: [PrismaModule],
})
export class UsersModule {}
