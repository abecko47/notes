import React, { useEffect, useState } from "react";
import { NoteDto } from "../../const/dto/Note.dto";
import { Link } from "react-router-dom";
import TagManager from "./TagManager";

export type NotesListArgs = {
  notes: NoteDto[];
};

export default function NotesList({ notes }: NotesListArgs) {
  return (
    <>
      {notes.map((note) => (
        <>
          <Link to={`/note/${note.id}`}>
            <div>{note.name}</div>
          </Link>
          <TagManager noteId={note.id} tagAffinity={"note"} notesAndTags={note.notesAndTags} />
        </>
      ))}
    </>
  );
}
