import React, { useEffect, useState } from "react";
import { NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import { useApi } from "../../ctx/api/context";
import { Button } from "@mui/material";

export type NotebooksListArgs = {
  notebooks: NotebookDto[];
  onDelete: (notebookId: string) => void;
};

export default function NotebooksList({ notebooks, onDelete }: NotebooksListArgs) {
  const { removeNotebook } = useApi();

  return (
    <>
      {notebooks.map((notebook) => (
        <>
          <div>{notebook.name}</div>
          <Button
            onClick={async () => {
              const result = await removeNotebook(notebook);
              if (result) {
                onDelete(notebook.id);
                return;
              }

              alert("Something wrong happened. If the notebook contains notes, first delete them.");
            }}
          >
            Delete
          </Button>
        </>
      ))}
    </>
  );
}