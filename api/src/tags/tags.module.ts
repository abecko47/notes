import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";
import {NotebooksService} from "../notebooks/notebooks.service";
import {NotesService} from "../notes/notes.service";

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService, NotebooksService, NotesService],
  imports: [PrismaModule],
})
export class TagsModule {}
