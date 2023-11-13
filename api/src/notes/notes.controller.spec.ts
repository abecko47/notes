import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import {PrismaService} from "../prisma/prisma.service";
import {NotebooksService} from "../notebooks/notebooks.service";
import {PrismaModule} from "../prisma/prisma.module";

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService, PrismaService, NotebooksService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
