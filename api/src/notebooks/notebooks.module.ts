import { Module } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [NotebooksController],
  providers: [NotebooksService, PrismaService],
})
export class NotebooksModule {}
