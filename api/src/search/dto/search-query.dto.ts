import {ApiProperty} from "@nestjs/swagger";

export class SearchQueryDto {
    @ApiProperty()
    query: string
}