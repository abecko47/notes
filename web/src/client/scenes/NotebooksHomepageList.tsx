import React, { useEffect, useState } from "react";
import { useApi } from "../../ctx/api/context";
import { NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import NotebooksList from "../components/NotebooksList";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useTagsObserver } from "../../ctx/tag-update/context";
import {Grid} from "@mui/joy";
import {FullGridButton, FullWidthTextField, NotebookAddButtonContainer} from "../components/StyledComponents";

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
    });
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
        <Grid xs={12}>
            <h2>Notebooks</h2>
        </Grid>
        <Grid alignItems={"center"} alignContent={"flex-end"}  container xs={12}>
            <Grid xs={4}>
                <FullWidthTextField
                    id="new-notebook"
                    label="Write new notebook name here to add"
                    variant="outlined"
                    value={newNotebookName}
                    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewNotebookName(e.target.value);
                    }}
                />
            </Grid>
            <NotebookAddButtonContainer xs={1}>
                <FullGridButton
                    type="submit"
                    variant={"contained"}
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
                    Add
                </FullGridButton>
            </NotebookAddButtonContainer>
        </Grid>
        <Grid spacing={1} container xs={12} style={{
            marginTop: "8px",
        }}>
            <NotebooksList
                onDelete={() => {
                    refreshNotebooks();
                }}
                notebooks={notebooks}
            />
        </Grid>

    </>
  );
}
