import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    content: string | null

    @ApiHideProperty()
    userId: string

    @ApiProperty()
    notebookId: string | null
}
