import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {PrismaService} from "../prisma/prisma.service";
import {UserDto} from "../users/dto/User.dto";
import {throwIfUserIsNotOwner} from "../util/process.env";
import {User} from "@prisma/client";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

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
}
