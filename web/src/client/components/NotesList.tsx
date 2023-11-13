import React, { useEffect, useState } from "react";
import { NoteDto } from "../../const/dto/Note.dto";
import { Link } from "react-router-dom";
import TagManager from "./TagManager";
import {Grid} from "@mui/joy";
import {NotebookBorderContainer, LastGridItem, MarginedHeader, NoteBorderContainer} from "./StyledComponents";
import {Button} from "@mui/material";

export type NotesListArgs = {
  notes: NoteDto[];
};

export default function NotesList({ notes }: NotesListArgs) {
  return (
    <Grid spacing={1} container xs={12}>
      {notes.map((note) => (
        <NoteBorderContainer key={note.id} container xs={3} alignItems={"center"}>
          <Grid xs={6}>
            <MarginedHeader>{note.name}</MarginedHeader>
          </Grid>
          <Grid xs={12}>
            <div>{`${note.content?.substring(0, 20)}${note.content?.length !== undefined && note.content?.length > 20 ? "..." : ""}`}</div>
          </Grid>
          <Grid xs={12}>
            <TagManager noteId={note.id} tagAffinity={"note"} notesAndTags={note.notesAndTags} />
          </Grid>
          <LastGridItem xs={6}>
            <Link to={`/note/${note.id}`}>
              <Button variant={"contained"} name={"view-note"}>View</Button>
            </Link>
          </LastGridItem>


        </NoteBorderContainer>
      ))}
    </Grid>
  );
}
