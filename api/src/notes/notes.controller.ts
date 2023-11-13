import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersDecorator } from '../users/users.decorator';
import { UserDto } from '../users/dto/User.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @UsersDecorator() user: UserDto,
  ) {
    return this.notesService.create(createNoteDto, user);
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
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @UsersDecorator() user: UserDto,
  ) {
    return this.notesService.update(id, updateNoteDto, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @UsersDecorator() user: UserDto) {
    return this.notesService.remove(id, user);
  }
}
