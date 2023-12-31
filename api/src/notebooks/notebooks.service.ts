import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/User.dto';
import { throwIfUserIsNotOwner } from '../util/process.env';

@Injectable()
export class NotebooksService {
  constructor(private prisma: PrismaService) {}

  // Using this to throw 400, instead of 500. One user cannot update records of another one.
  public async getNotebookSafe(notebookId: string, user: UserDto) {
    // findMany() as it doesn't throw error if not found
    const notebooks = await this.prisma.notebook.findMany({
      where: {
        id: notebookId,
      },
    });

    if (notebooks.length === 0) {
      throw new BadRequestException();
    }

    throwIfUserIsNotOwner(notebooks[0].userId, user.id);

    return notebooks[0];
  }

  create(createNotebookDto: CreateNotebookDto, user: UserDto) {
    return this.prisma.notebook.create({
      data: {
        userId: user.id,
        name: createNotebookDto.name,
      },
    });
  }

  findAll(user: UserDto) {
    return this.prisma.notebook.findMany({
      where: {
        user,
      },
      select: {
        name: true,
        id: true,
        notes: {
          select: {
            id: true,
            name: true,
            content: true,
            createdAt: true,
            notebookId: true,
            notesAndTags: {
              select: {
                tag: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        notebooksAndTags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string, user: UserDto) {
    return this.prisma.notebook.findFirst({
      where: {
        id,
        user,
      },
      select: {
        name: true,
        id: true,
        notes: {
          select: {
            id: true,
            name: true,
            content: true,
            createdAt: true,
            notebookId: true,
            notesAndTags: {
              select: {
                tag: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        notebooksAndTags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateNotebookDto: UpdateNotebookDto,
    user: UserDto,
  ) {
    const notebook = await this.getNotebookSafe(id, user);

    return this.prisma.notebook.update({
      where: notebook,
      data: updateNotebookDto,
    });
  }

  async remove(id: string, user: UserDto) {
    const notebook = await this.getNotebookSafe(id, user);

    await this.prisma.notebooksAndTags.deleteMany({
      where: {
        notebook,
      },
    });

    return this.prisma.notebook.delete({
      where: notebook,
    });
  }
}
