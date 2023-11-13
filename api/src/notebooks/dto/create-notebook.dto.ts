import { ApiProperty } from '@nestjs/swagger';

export class CreateNotebookDto {
  @ApiProperty()
  name: string;
}
