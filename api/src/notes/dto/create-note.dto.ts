import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    content: string | null

    @ApiProperty()
    notebookId: string | null
}
