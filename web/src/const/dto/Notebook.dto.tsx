import {NoteDto} from "./Note.dto";

export type NotebookDto = {
  id: string;
  name: string;
  notes: NoteDto[];
};
