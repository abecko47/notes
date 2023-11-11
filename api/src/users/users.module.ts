import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService],
  imports: [PrismaModule],
})
export class UsersModule {}
