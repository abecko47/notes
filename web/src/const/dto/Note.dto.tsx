import { NotebookDto } from "./Notebook.dto";
import {TagDto} from "./tag.dto";

export type NoteAndTagDto = {
  tag: TagDto;
}

export type NoteDto = {
  id: string;
  name: string;
  content: string | null;
  notebookId: string | null;
  notebook?: NotebookDto | null;
  createdAt: string | null;
  notesAndTags: NoteAndTagDto[]
};

export const makeEmptyNote = (): NoteDto => {
  return {
    id: "",
    name: "",
    content: null,
    notebookId: null,
    createdAt: null,
    notesAndTags: [],
  };
};
