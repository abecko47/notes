import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { PrismaService } from '../prisma/prisma.service';
import { queryToTsQueryWithAnd, queryToTsQueryWithOr } from './util/searchUtil';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService, PrismaService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test transformation to tsQuery with and', () => {
    const searchQuery = 'my note ';
    expect(queryToTsQueryWithAnd(searchQuery)).toEqual('my:* & note:*');
  });

  it('test transformation to tsQuery with or', () => {
    const searchQuery = 'my note ';
    expect(queryToTsQueryWithOr(searchQuery)).toEqual('my:* | note:*');
  });
});
