import React, { useEffect, useState } from "react";
import { NoteAndTagDto } from "../../const/dto/Note.dto";
import { NotebookAndTagDto } from "../../const/dto/Notebook.dto";
import { TagAffinity, TagDto } from "../../const/dto/tag.dto";
import { Button } from "@mui/material";
import { useTagsObserver } from "../../ctx/tag-update/context";
import { useApi } from "../../ctx/api/context";

export type TagsListArgs = {
  tags: TagDto[];
  noteId: string;
};

export default function TagList({ tags, noteId }: TagsListArgs) {
  const { notify } = useTagsObserver();
  const { editNoteAndTag } = useApi();

  return (
    <>
      {tags.map((tag) => {
        return (
          <>
            <span>{tag.name}</span>
            <Button
              onClick={async () => {
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
