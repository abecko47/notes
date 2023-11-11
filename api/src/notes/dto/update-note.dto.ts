import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @ApiProperty()
    name: string

    @ApiProperty()
    content: string | null

    @ApiProperty()
    notebookId: string | null
}
