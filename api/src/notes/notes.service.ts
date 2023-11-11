import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {PrismaService} from "../prisma/prisma.service";
import {UserDto} from "../users/dto/User.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: createNoteDto
    })
  }

  findAll(user: UserDto) {
    return this.prisma.note.findMany({
      where: {
        user,
      }
    });
  }

  findOne(id: string, user: UserDto) {
    return this.prisma.note.findFirst({
      where: {
        id,
        user,
      }
    })
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.prisma.note.update({
      where: {
        id
      },
      data: updateNoteDto
    });
  }

  remove(id: string) {
    return this.prisma.note.delete({
      where: {
        id
      },
    });
  }
}
