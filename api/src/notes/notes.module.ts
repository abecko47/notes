import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotebooksService } from '../notebooks/notebooks.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService, NotebooksService],
  imports: [PrismaModule],
})
export class NotesModule {}
