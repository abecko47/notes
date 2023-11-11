import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/User.dto';
import { UsersService } from '../users/users.service';
import { throwIfUserIsNotOwner } from '../util/process.env';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  // Using this to throw 400, instead of 500. One user cannot update records of another one.
  private async throwIfViolation(noteId: string, user: UserDto) {
    const notes = await this.prisma.note.findMany({
      where: {
        id: noteId,
      },
    });

    if (notes.length === 0) {
      throw new BadRequestException();
    }

    throwIfUserIsNotOwner(notes[0].userId, user.id);
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

  findOne(id: string, user: UserDto) {
    return this.prisma.note.findFirst({
      where: {
        id,
        user,
      },
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: UserDto) {
    await this.throwIfViolation(id, user);

    return this.prisma.note.update({
      where: {
        id,
        user,
      },
      data: updateNoteDto,
    });
  }

  async remove(id: string, user: UserDto) {
    await this.throwIfViolation(id, user);

    return this.prisma.note.delete({
      where: {
        id,
        user,
      },
    });
  }
}
