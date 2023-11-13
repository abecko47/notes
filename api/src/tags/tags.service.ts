import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/User.dto';
import { throwIfUserIsNotOwner } from '../util/process.env';
import { User } from '@prisma/client';
import { EditTagToNotebookDto } from './dto/edit-tag-to-notebook.dto';
import { NotebooksService } from '../notebooks/notebooks.service';
import { NotesService } from '../notes/notes.service';
import { EditTagAndNoteDto } from './dto/edit-tag-and-note.dto';

@Injectable()
export class TagsService {
  constructor(
    private prisma: PrismaService,
    private notebooks: NotebooksService,
    private notes: NotesService,
  ) {}

  // Using this to throw 400, instead of 500. One user cannot update records of another one.
  public async getTagSafe(tagId: string, user: UserDto) {
    // findMany() as it doesn't throw error if not found
    const tags = await this.prisma.tag.findMany({
      where: {
        id: tagId,
      },
    });

    if (tags.length === 0) {
      throw new BadRequestException();
    }

    throwIfUserIsNotOwner(tags[0].userId, user.id);

    return tags[0];
  }

  private async getWithInsert(name: string, user: UserDto) {
    const tags = await this.prisma.tag.findMany({
      where: {
        name,
        user,
      },
    });

    return tags.length === 0
      ? await this.create(
          {
            name: name,
          },
          user,
        )
      : tags[0];
  }

  create(createTagDto: CreateTagDto, user: UserDto) {
    return this.prisma.tag.create({
      data: {
        userId: user.id,
        name: createTagDto.name,
      },
    });
  }

  findAll(user: UserDto) {
    return this.prisma.tag.findMany({
      where: {
        user,
      },
    });
  }

  findOne(id: string, user: UserDto) {
    return this.prisma.tag.findFirst({
      where: {
        id,
        user,
      },
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto, user: UserDto) {
    const tag = await this.getTagSafe(id, user);

    return this.prisma.tag.update({
      where: tag,
      data: updateTagDto,
    });
  }

  async remove(id: string, user: UserDto) {
    const tag = await this.getTagSafe(id, user);

    return this.prisma.tag.delete({
      where: tag,
    });
  }

  async editNotebookAndTag(
    tagName: string,
    editTagToNotebookDto: EditTagToNotebookDto,
    user: UserDto,
  ) {
    const tag = await this.getWithInsert(tagName, user);
    const notebook = await this.notebooks.getNotebookSafe(
      editTagToNotebookDto.notebookId,
      user,
    );

    const notebooksAndTags = await this.prisma.notebooksAndTags.findMany({
      where: {
        tag,
        notebook,
      },
    });

    if (editTagToNotebookDto.action === 'assign') {
      if (notebooksAndTags.length === 0) {
        return this.prisma.notebooksAndTags.create({
          data: {
            tagId: tag.id,
            notebookId: notebook.id,
          },
        });
      }

      return notebooksAndTags[0];
    }

    if (notebooksAndTags.length === 0) {
      return null;
    }

    const notebookAndTagToRemove = notebooksAndTags[0];

    return this.prisma.notebooksAndTags.delete({
      where: {
        notebookId_tagId: notebookAndTagToRemove,
      },
    });
  }

  async editNoteAndTag(
    tagName: string,
    editTagAndNoteDto: EditTagAndNoteDto,
    user: UserDto,
  ) {
    const tag = await this.getWithInsert(tagName, user);
    const note = await this.notes.getNoteSafe(editTagAndNoteDto.noteId, user);

    const notesAndTags = await this.prisma.notesAndTags.findMany({
      where: {
        tag,
        note,
      },
    });

    if (editTagAndNoteDto.action === 'assign') {
      if (notesAndTags.length === 0) {
        return this.prisma.notesAndTags.create({
          data: {
            tagId: tag.id,
            noteId: note.id,
          },
        });
      }

      return notesAndTags[0];
    }

    if (notesAndTags.length === 0) {
      return null;
    }

    const noteAndTagToRemove = notesAndTags[0];

    return this.prisma.notesAndTags.delete({
      where: {
        noteId_tagId: noteAndTagToRemove,
      },
    });
  }
}
