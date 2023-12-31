import React from "react";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import { useApi } from "../../ctx/api/context";
import { Button } from "@mui/material";
import NotesList from "./NotesList";
import TagManager from "./TagManager";
import { Divider, Grid } from "@mui/joy";
import {
  LastGridItem,
  NotebookBorderContainer,
  MarginedHeader,
  MarginedSmallHeader,
  MarginedContainer,
} from "./StyledComponents";

export type NotebooksListArgs = {
  notebooks: NotebookDto[];
  onDelete: () => void;
};

export default function NotebooksList({ notebooks, onDelete }: NotebooksListArgs) {
  const { removeNotebook } = useApi();

  return (
    <>
      {notebooks.map((notebook) => (
        <Grid key={notebook.id} xs={12}>
          <NotebookBorderContainer container xs={12}>
            <Grid xs={3}>
              <MarginedHeader>Notebook "{notebook.name}"</MarginedHeader>
            </Grid>
            <LastGridItem xs={9}>
              <Button
                name={"delete-notebook"}
                variant={"contained"}
                color={"error"}
                onClick={async () => {
                  const result = await removeNotebook(notebook);
                  if (result) {
                    onDelete();
                    return;
                  }

                  alert(
                    "Something wrong happened. If the notebook contains notes, first delete them.",
                  );
                }}
              >
                Remove
              </Button>
            </LastGridItem>
            <Grid xs={12}>
              <MarginedSmallHeader>Notes</MarginedSmallHeader>
            </Grid>
            <Grid xs={12}>
              <NotesList notes={notebook.notes} />
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
            <MarginedContainer xs={3}>
              <TagManager
                notebookId={notebook.id}
                tagAffinity={"notebook"}
                notebooksAndTags={notebook.notebooksAndTags}
              />
            </MarginedContainer>
          </NotebookBorderContainer>
        </Grid>
      ))}
    </>
  );
}
