import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotebookDto } from './create-notebook.dto';

export class UpdateNotebookDto extends PartialType(CreateNotebookDto) {
  @ApiProperty()
  name: string;
}
