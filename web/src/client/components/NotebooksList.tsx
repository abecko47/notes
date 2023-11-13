import React, { useEffect, useState } from "react";
import { NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import { useApi } from "../../ctx/api/context";
import { Button } from "@mui/material";
import NotesList from "./NotesList";
import TagManager from "./TagManager";
import {Grid} from "@mui/joy";
import {FullGridButton, LastGridItem, NotebookBorderContainer, MarginedHeader} from "./StyledComponents";

export type NotebooksListArgs = {
  notebooks: NotebookDto[];
  onDelete: () => void;
};

export default function NotebooksList({ notebooks, onDelete }: NotebooksListArgs) {
  const { removeNotebook } = useApi();

  return (
    <>
      {notebooks.map((notebook) => (
        <Grid xs={12}>
          <NotebookBorderContainer container xs={12}>
            <Grid xs={10}>
              <MarginedHeader>{notebook.name}</MarginedHeader>
            </Grid>
            <LastGridItem xs={2}>
              <FullGridButton
                  name={"delete-notebook"}
                  variant={"contained"}
                  color={"error"}
                  onClick={async () => {
                    const result = await removeNotebook(notebook);
                    if (result) {
                      onDelete();
                      return;
                    }

                    alert("Something wrong happened. If the notebook contains notes, first delete them.");
                  }}
              >
                Remove
              </FullGridButton>
            </LastGridItem>
            <NotesList notes={notebook.notes} />
          </NotebookBorderContainer>


          <TagManager
            notebookId={notebook.id}
            tagAffinity={"notebook"}
            notebooksAndTags={notebook.notebooksAndTags}
          />
          <h5>Notes</h5>

        </Grid>
      ))}
    </>
  );
}
