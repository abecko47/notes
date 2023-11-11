import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UsersDecorator} from "../users/users.decorator";
import {UserDto} from "../users/dto/User.dto";

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createTagDto: CreateTagDto, @UsersDecorator() user: UserDto,) {
    return this.tagsService.create(createTagDto, user);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@UsersDecorator() user: UserDto,) {
    return this.tagsService.findAll(user);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @UsersDecorator() user: UserDto,) {
    return this.tagsService.findOne(id, user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto, @UsersDecorator() user: UserDto,) {
    return this.tagsService.update(id, updateTagDto, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @UsersDecorator() user: UserDto,) {
    return this.tagsService.remove(id, user);
  }
}
