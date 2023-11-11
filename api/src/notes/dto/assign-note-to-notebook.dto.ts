import {ApiProperty} from "@nestjs/swagger";

export class AssignNoteToNotebookDto {
    @ApiProperty()
    notebookId?: string | null
}