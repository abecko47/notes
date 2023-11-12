import {ApiProperty} from "@nestjs/swagger";

export class AssignTagToNotebookDto {
    @ApiProperty()
    name: string
    notebookId: string
}