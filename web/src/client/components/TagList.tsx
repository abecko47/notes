import React, { useEffect, useState } from "react";
import { NoteAndTagDto } from "../../const/dto/Note.dto";
import { NotebookAndTagDto } from "../../const/dto/Notebook.dto";
import { TagAction, TagAffinity, TagDto } from "../../const/dto/tag.dto";
import { Button, TextField } from "@mui/material";
import { useTagsObserver } from "../../ctx/tag-update/context";
import { useApi } from "../../ctx/api/context";

export type TagsListArgs = {
  tags: TagDto[];
  noteId?: string;
  notebookId?: string;
};

export default function TagList({ tags, noteId, notebookId }: TagsListArgs) {
  const { notify } = useTagsObserver();
  const { editNoteAndTag, editNotebookAndTag } = useApi();

  const [newTagName, setNewTagName] = useState("");

  if (noteId === undefined && notebookId === undefined) {
    return <></>;
  }

  const editTag = async (
    tagName: string,
    action: TagAction,
    noteId?: string,
    notebookId?: string,
  ) => {
    if (noteId !== undefined) {
      const result = await editNoteAndTag({
        tagName: tagName,
        action,
        noteId,
      });

      if (!result) {
        alert("Something went wrong.");
        return;
      }

      notify();
    }

    if (notebookId !== undefined) {
      const result = await editNotebookAndTag({
        tagName: tagName,
        action,
        notebookId,
      });

      if (!result) {
        alert("Something went wrong.");
        return;
      }

      notify();
    }
  };

  return (
    <>
      <TextField
        type="name"
        label={"Add new tag"}
        value={newTagName}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setNewTagName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          editTag(newTagName, "assign", noteId, notebookId);
        }}
      >
        +
      </Button>
      {tags.map((tag) => {
        return (
          <>
            <span>{tag.name}</span>
            <Button
              onClick={() => {
                editTag(tag.name, "remove", noteId, notebookId);
              }}
            >
              Delete
            </Button>
          </>
        );
      })}
    </>
  );
}
