import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { UsersDecorator } from '../users/users.decorator';
import { UserDto } from '../users/dto/User.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('notebooks')
@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createNotebookDto: CreateNotebookDto,
    @UsersDecorator() user: UserDto,
  ) {
    return this.notebooksService.create(createNotebookDto, user);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@UsersDecorator() user: UserDto) {
    return this.notebooksService.findAll(user);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @UsersDecorator() user: UserDto) {
    return this.notebooksService.findOne(id, user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotebookDto: UpdateNotebookDto,
    @UsersDecorator() user: UserDto,
  ) {
    return this.notebooksService.update(id, updateNotebookDto, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @UsersDecorator() user: UserDto) {
    return this.notebooksService.remove(id, user);
  }
}
