export type UpsertNoteDto = {
  id: string;
  name?: string;
  content?: string | null;
  notebookId?: string | null;
};
