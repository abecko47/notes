import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotebooksService } from '../notebooks/notebooks.service';
import { NotesService } from '../notes/notes.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, PrismaService, NotebooksService, NotesService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
