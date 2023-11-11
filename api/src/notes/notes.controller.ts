import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {UsersDecorator} from "../users/users.decorator";
import {UserDto} from "../users/dto/User.dto";

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@UsersDecorator() user: UserDto) {
    return this.notesService.findAll(user);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @UsersDecorator() user: UserDto) {
    return this.notesService.findOne(id, user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
