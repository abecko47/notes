import {ApiProperty} from "@nestjs/swagger";

export class AssignTagToNoteDto {
    @ApiProperty()
    name: string
    notebookId?: string | null
}