import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import {PrismaService} from "../prisma/prisma.service";

describe('NotebooksService', () => {
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotebooksService, PrismaService],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
