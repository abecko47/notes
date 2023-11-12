import { ApiProperty } from '@nestjs/swagger';

export class EditTagAndNoteDto {
  @ApiProperty()
  noteId: string;
  @ApiProperty()
  action: 'assign' | 'remove';
}
