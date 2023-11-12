import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/User.dto';
import { UsersService } from '../users/users.service';
import { throwIfUserIsNotOwner } from '../util/process.env';
import {NotebooksService} from "../notebooks/notebooks.service";
import {AssignNoteToNotebookDto} from "./dto/assign-note-to-notebook.dto";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService, private notebooks: NotebooksService) {}

  // Using this to throw 400, instead of 500. One user cannot update records of another one.
  public async getNoteSafe(noteId: string, user: UserDto) {
    // findMany() as it doesn't throw error if not found
    const notes = await this.prisma.note.findMany({
      where: {
        id: noteId,
      },
    });

    if (notes.length === 0) {
      throw new BadRequestException();
    }

    throwIfUserIsNotOwner(notes[0].userId, user.id);

    return notes[0];
  }

  create(createNoteDto: CreateNoteDto, user: UserDto) {
    return this.prisma.note.create({
      data: {
        userId: user.id,
        name: createNoteDto.name,
        notebookId: createNoteDto.notebookId,
        content: createNoteDto.content,
      },
    });
  }

  findAll(user: UserDto) {
    return this.prisma.note.findMany({
      where: {
        user,
      },
    });
  }

  async findOne(id: string, user: UserDto) {
    const note = this.prisma.note.findFirst({
      where: {
        id,
        user,
      },
    });

    return {
      ...(await note),
      notebook: await note.notebook(),
      tags: await note.notesAndTags(),
    }
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: UserDto) {
    await this.getNoteSafe(id, user);

    return this.prisma.note.update({
      where: {
        id,
        user,
      },
      data: updateNoteDto,
    });
  }

  async remove(id: string, user: UserDto) {
    await this.getNoteSafe(id, user);

    return this.prisma.note.delete({
      where: {
        id,
        user,
      },
    });
  }

  async assignToNotebook(id: string, assignNoteToNotebookDto: AssignNoteToNotebookDto, user: UserDto) {
    console.log({id})
    const note = await this.getNoteSafe(id, user);



    if (assignNoteToNotebookDto.notebookId === null || assignNoteToNotebookDto.notebookId === undefined) {
      return this.prisma.note.update({
        where: note,
        data: {
          notebookId: null,
        }
      })
    }

    const notebook = await this.notebooks.getNotebookSafe(assignNoteToNotebookDto.notebookId, user);

    return this.prisma.note.update({
      where: note,
      data: {
        notebookId: notebook.id,
      }
    })
  }
}
