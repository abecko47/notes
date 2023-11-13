import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotebooksService } from '../notebooks/notebooks.service';
import { NotesService } from '../notes/notes.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('TagsController', () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService, PrismaService, NotebooksService, NotesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
