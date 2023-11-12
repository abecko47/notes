import React, { useEffect, useState } from "react";
import { NoteDto } from "../../const/dto/Note.dto";

export type NotesListArgs = {
  notes: NoteDto[];
};

export default function NotesList({ notes }: NotesListArgs) {
  return (
    <>
      {notes.map((note) => (
        <div>{note.name}</div>
      ))}
    </>
  );
}
