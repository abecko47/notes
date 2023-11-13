import React, { useEffect, useState } from "react";
import { NoteAndTagDto } from "../../const/dto/Note.dto";
import { NotebookAndTagDto } from "../../const/dto/Notebook.dto";
import { TagAffinity, TagDto } from "../../const/dto/tag.dto";
import { Button } from "@mui/material";
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

  if (noteId === undefined && notebookId === undefined) {
    return <></>;
  }

  return (
    <>
      {tags.map((tag) => {
        return (
          <>
            <span>{tag.name}</span>
            <Button
              onClick={async () => {
                if (noteId !== undefined) {
                  const result = await editNoteAndTag({
                    tagName: tag.name,
                    action: "remove",
                    noteId,
                  });

                  if (!result) {
                    alert("Something went wrong.")
                    return;
                  }

                  notify();
                }

                if (notebookId !== undefined) {
                  const result = await editNotebookAndTag({
                    tagName: tag.name,
                    action: "remove",
                    notebookId,
                  });

                  if (!result) {
                    alert("Something went wrong.")
                    return;
                  }

                  notify();
                }
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
