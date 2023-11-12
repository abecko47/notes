import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {SearchService} from './search.service';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UsersDecorator} from "../users/users.decorator";
import {UserDto} from "../users/dto/User.dto";
import {SearchQueryDto} from "./dto/search-query.dto";
import {SearchPayload} from "./entity/search-payload.entity";

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Search records',
    type: SearchPayload,
    isArray: false
  })
  @Post()
  search(@Body() searchQueryDto: SearchQueryDto, @UsersDecorator() user: UserDto) {
    return this.searchService.search(searchQueryDto, user);
  }
}
