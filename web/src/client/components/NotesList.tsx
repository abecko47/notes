import React from "react";
import { NoteDto } from "../../const/dto/Note.dto";
import { Link } from "react-router-dom";
import TagManager from "./TagManager";
import { Divider, Grid } from "@mui/joy";
import {
  LastGridItem,
  MarginedHeader,
  NoteBorderContainer,
  MarginedContainer,
  SmallText,
} from "./StyledComponents";
import { Button } from "@mui/material";

export type NotesListArgs = {
  notes: NoteDto[];
};

export default function NotesList({ notes }: NotesListArgs) {
  return (
    <Grid spacing={1} container xs={12}>
      {notes.map((note) => (
        <NoteBorderContainer
          spacing={1}
          key={note.id}
          container
          xs={3}
          alignItems={"center"}
          alignContent={"flex-start"}
        >
          <Grid xs={6}>
            <MarginedHeader>"{note.name}"</MarginedHeader>
          </Grid>
          <MarginedContainer xs={12}>
            <SmallText>{`${note.content?.substring(0, 20)}${
              note.content?.length !== undefined && note.content?.length > 20 ? "..." : ""
            }`}</SmallText>
          </MarginedContainer>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <TagManager noteId={note.id} tagAffinity={"note"} notesAndTags={note.notesAndTags} />
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <LastGridItem xs={6}>
            <Link to={`/note/${note.id}`}>
              <Button variant={"contained"} name={"view-note"}>
                View note
              </Button>
            </Link>
          </LastGridItem>
        </NoteBorderContainer>
      ))}
    </Grid>
  );
}
