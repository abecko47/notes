import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersDecorator } from '../users/users.decorator';
import { UserDto } from '../users/dto/User.dto';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiBearerAuth()
  @Post()
  search(
    @Body() searchQueryDto: SearchQueryDto,
    @UsersDecorator() user: UserDto,
  ) {
    return this.searchService.search(searchQueryDto, user);
  }
}
