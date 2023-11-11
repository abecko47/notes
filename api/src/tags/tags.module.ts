import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService],
  imports: [PrismaModule],
})
export class TagsModule {}
