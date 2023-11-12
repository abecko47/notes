import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {NotebooksService} from "../notebooks/notebooks.service";
import {NotesService} from "../notes/notes.service";
import {SearchQueryDto} from "./dto/search-query.dto";
import {UserDto} from "../users/dto/User.dto";
import {queryToTsQueryWithAnd, queryToTsQueryWithOr} from "./util/searchUtil";
import {Note, Notebook} from "@prisma/client";
import {SearchPayload} from "./entity/search-payload.entity";

@Injectable()
export class SearchService {
    constructor(
        private prisma: PrismaService,
    ) {}

    private findNotes(tsQuery: string, userDto: UserDto) {
        return this.prisma.note.findMany({
            where: {
                OR: [
                    {name: {
                            search: tsQuery,
                        }},
                    {content: {
                            search: tsQuery,
                        }},

                ],
                user: userDto,
            }
        });
    }

    private findNotebooks(tsQuery: string, userDto: UserDto) {
        return this.prisma.notebook.findMany({
            where: {
                name: {
                    search: tsQuery,
                },
                user: userDto,
            }
        });
    }

    async search(searchQueryDto: SearchQueryDto, userDto: UserDto): Promise<SearchPayload> {
        const fullHitQuery = queryToTsQueryWithAnd(searchQueryDto.query);
        const partialHitQuery = queryToTsQueryWithOr(searchQueryDto.query);

        const fullHitNotes = await this.findNotes(fullHitQuery, userDto);
        const partialHitNotes = await this.findNotes(partialHitQuery, userDto);

        const fullHitNotebooks = await this.findNotebooks(fullHitQuery, userDto);
        const partialHitNotebooks = await this.findNotebooks(partialHitQuery, userDto);

        const mergedNotes = partialHitNotes.reduce((acc, curr) => {
            return acc.find((hit) => hit.id === curr.id) !== undefined ? acc : [...acc, curr]
        }, [...fullHitNotes]);

        const mergedNotebooks = partialHitNotebooks.reduce((acc, curr) => {
            return acc.find((hit) => hit.id === curr.id) !== undefined ? acc : [...acc, curr]
        }, [...fullHitNotebooks]);

        return {
            notes: mergedNotes,
            notebooks: mergedNotebooks,
        }
    }
}
