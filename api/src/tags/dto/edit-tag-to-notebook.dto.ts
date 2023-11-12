import { ApiProperty } from '@nestjs/swagger';

export class EditTagToNotebookDto {
  @ApiProperty()
  notebookId: string;
  @ApiProperty()
  action: 'assign' | 'remove';
}
