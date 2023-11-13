import React, { useEffect, useState } from "react";
import { useApi } from "../../ctx/api/context";
import { NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import NotebooksList from "../components/NotebooksList";
import {Button, CircularProgress, TextField} from "@mui/material";
import {useTagsObserver} from "../../ctx/tag-update/context";

export default function NotebooksHomepageList() {
  const api = useApi();
  const { register } = useTagsObserver();
  const [notebooks, setNotebooks] = useState<NotebookDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState("");

  const refreshNotebooks = async () => {
    setIsLoading(true);
    setNotebooks(await api.getNotebooks());
    setIsLoading(false);
  };

  useEffect(() => {
    refreshNotebooks();

    register("notebooksHomepage", () => {
          refreshNotebooks();
    })
  }, []);

  if (isLoading) {
      return <CircularProgress />
  }

  return (
    <>
      <h2>Notebooks</h2>
      <TextField
        id="search"
        label="Add new notebook"
        variant="outlined"
        value={newNotebookName}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setNewNotebookName(e.target.value);
        }}
      />
      <Button
        type="submit"
        onClick={async () => {
          if (newNotebookName === "") {
            return;
          }

          setIsLoading(true);
          const notebook = await api.addNotebook({
            name: newNotebookName,
          });

          if (notebook === null) {
            alert("Some error happened");
            return;
          }

          setNotebooks(await api.getNotebooks());
          setNewNotebookName("");
          setIsLoading(false);
        }}
      >
        Save
      </Button>
      <NotebooksList
        onDelete={(notebookId) => {
          refreshNotebooks();
        }}
        notebooks={notebooks}
      />
    </>
  );
}
