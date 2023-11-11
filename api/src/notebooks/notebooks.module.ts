import { Module } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [NotebooksController],
  providers: [NotebooksService, PrismaService],
  imports: [PrismaModule],
})
export class NotebooksModule {}
