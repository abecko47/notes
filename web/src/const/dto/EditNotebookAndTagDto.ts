import {TagAction} from "./tag.dto";

export type EditNotebookAndTagDto = {
  tagName: string;
  notebookId: string;
  action: TagAction;
};
