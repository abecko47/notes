import React, { useEffect, useState } from "react";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import { useApi } from "../../ctx/api/context";
import { CircularProgress } from "@mui/material";
import { Autocomplete } from "@mui/joy";
import {
  AddRemoveNotebookDto,
  makeEmptyNotebookForAssign,
} from "../../const/dto/AddRemoveNotebook.dto";

export type AssignNotebookProps = {
  noteId: string;
  defaultNotebook: AddRemoveNotebookDto;
};

export default function AssignNotebook({ noteId, defaultNotebook }: AssignNotebookProps) {
  const api = useApi();
  const [notebooks, setNotebooks] = useState<NotebookDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState({
    label: defaultNotebook.name,
    id: defaultNotebook.id ?? "",
  });

  const getNotebooks = async () => {
    setIsLoading(true);
    setNotebooks(await api.getNotebooks());
    setIsLoading(false);
  };

  useEffect(() => {
    getNotebooks();
  }, [api]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Autocomplete
      onChange={async (e, value) => {
        e.preventDefault();
        console.log({ value });
        if (!value) {
          return;
        }
        setIsLoading(true);

        const updatedNote = await api.upsertNote({
          id: noteId,
          notebookId: value.id !== "" ? value.id : null,
        });

        if (updatedNote) {
          alert(`Assigned this note to ${value.label} notebook.`);
        }

        setDefaultValue(value);
        setIsLoading(false);
      }}
      defaultValue={defaultValue}
      options={[
        makeEmptyNotebookForAssign(),
        ...notebooks.map((notebook) => {
          return {
            label: notebook.name,
            id: notebook.id,
          };
        }),
      ]}
    />
  );
}
