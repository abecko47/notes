export type EditNotebookAndTagDto = {
  tagName: string;
  notebookId: string;
  action: "assign" | "remove";
};
