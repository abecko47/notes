import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import {PrismaService} from "../prisma/prisma.service";
import {UsersModule} from "../users/users.module";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
  imports: [PrismaModule],
})
export class NotesModule {}
