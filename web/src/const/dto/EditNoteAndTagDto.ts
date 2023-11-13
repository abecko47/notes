import {TagAction} from "./tag.dto";

export type EditNoteAndTagDto = {
  tagName: string;
  noteId: string;
  action: TagAction;
};
