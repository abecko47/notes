import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import {PrismaService} from "../prisma/prisma.service";
import {NotesService} from "../notes/notes.service";
import {NotebooksService} from "../notebooks/notebooks.service";

@Module({
  controllers: [SearchController],
  providers: [SearchService, PrismaService],
})
export class SearchModule {}
