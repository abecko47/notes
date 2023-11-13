import React, { useEffect, useState } from "react";
import { useApi } from "../../ctx/api/context";
import { NoteDto } from "../../const/dto/Note.dto";
import NotesList from "../components/NotesList";
import { useTagsObserver } from "../../ctx/tag-update/context";
import { log } from "util";
import { CircularProgress } from "@mui/material";
import {Grid} from "@mui/joy";

export default function NotesHomepageList() {
  const api = useApi();
  const { register } = useTagsObserver();
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<NoteDto[]>([]);

  const fetchNotes = async () => {
    setIsLoading(true);
    setNotes(await api.getNotes());
    setIsLoading(false);
  };

  useEffect(() => {
    register("notesHomepage", () => {
      fetchNotes();
    });

    fetchNotes();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid xs={12}>
        <h2>Unsorted notes</h2>
      </Grid>

      <NotesList notes={notes} />
    </>
  );
}
