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
  private async throwIfViolation(tagId: string, user: UserDto) {
    const tags = await this.prisma.tag.findMany({
      where: {
        id: tagId,
      },
    });

    if (tags.length === 0) {
      throw new BadRequestException();
    }

    throwIfUserIsNotOwner(tags[0].userId, user.id);
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
    await this.throwIfViolation(id, user);

    return this.prisma.tag.update({
      where: {
        id,
        user,
      },
      data: updateTagDto,
    });
  }

  async remove(id: string, user: UserDto) {
    await this.throwIfViolation(id, user);

    return this.prisma.tag.delete({
      where: {
        id,
        user,
      },
    });
  }
}
