import React, { useEffect, useState } from "react";
import { useApi } from "../../ctx/api/context";
import { NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import NotebooksList from "../components/NotebooksList";
import { Button, TextField } from "@mui/material";

export default function NotebooksHomepageList() {
  const api = useApi();
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
  }, [api]);

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
