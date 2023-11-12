import { NotebookDto } from "./Notebook.dto";

export type NoteDto = {
  id: string;
  name: string;
  content: string | null;
  notebookId: string | null;
  notebook?: NotebookDto | null;
  createdAt: string | null;
};

export const makeEmptyNote = (): NoteDto => {
  return {
    id: "",
    name: "",
    content: null,
    notebookId: null,
    createdAt: null,
  };
};
