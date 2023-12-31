import React from "react";
import { NoteAndTagDto } from "../../const/dto/Note.dto";
import { NotebookAndTagDto } from "../../const/dto/Notebook.dto";
import { TagAffinity } from "../../const/dto/tag.dto";
import TagList from "./TagList";

export type TagManagerArgs = {
  notesAndTags?: NoteAndTagDto[];
  notebooksAndTags?: NotebookAndTagDto[];
  noteId?: string;
  notebookId?: string;
  tagAffinity: TagAffinity;
};

export default function TagManager({
  notesAndTags,
  notebooksAndTags,
  tagAffinity,
  noteId,
  notebookId,
}: TagManagerArgs) {
  if (tagAffinity === "note" && notesAndTags !== undefined) {
    return (
      <TagList
        tagAffinity={"note"}
        noteId={noteId}
        tags={notesAndTags.map((noteAndTag) => noteAndTag.tag)}
      />
    );
  }

  if (tagAffinity === "notebook" && notebooksAndTags !== undefined) {
    return (
      <TagList
        notebookId={notebookId}
        tagAffinity={"notebook"}
        tags={notebooksAndTags.map((notebookAndTag) => notebookAndTag.tag)}
      />
    );
  }

  return <></>;
}
