import {NoteDto} from "./Note.dto";
import {TagDto} from "./tag.dto";

export type NotebookAndTagDto = {
  tag: TagDto;
}

export type NotebookDto = {
  id: string;
  name: string;
  notes: NoteDto[];
  notebooksAndTags: NotebookAndTagDto[];
};
