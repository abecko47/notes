import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/User.dto';
import { UsersService } from '../users/users.service';
import { throwIfUserIsNotOwner } from '../util/process.env';
import { NotebooksService } from '../notebooks/notebooks.service';
import { AssignNoteToNotebookDto } from './dto/assign-note-to-notebook.dto';

@Injectable()
export class NotesService {
  constructor(
    private prisma: PrismaService,
    private notebooks: NotebooksService,
  ) {}

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
        notebookId: null,
      },
      select: {
        id: true,
        name: true,
        content: true,
        notesAndTags: {
          select: {
            tag: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: string, user: UserDto) {
    return this.prisma.note.findFirst({
      where: {
        id,
        user,
      },
      select: {
        id: true,
        name: true,
        content: true,
        notesAndTags: {
          select: {
            tag: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: UserDto) {
    await this.getNoteSafe(id, user);

    // Check if user is owner of notebook
    if (updateNoteDto.notebookId !== null) {
      await this.notebooks.getNotebookSafe(
          updateNoteDto.notebookId,
          user,
      );
    }

    return this.prisma.note.update({
      where: {
        id,
        user,
      },
      data: {
        name: updateNoteDto.name,
        content: updateNoteDto.content,
        notebookId: updateNoteDto.notebookId,
      },
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
}
