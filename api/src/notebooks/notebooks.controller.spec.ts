import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('NotebooksController', () => {
  let controller: NotebooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [NotebooksService, PrismaService],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
