import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useApi} from "../api/context";
import {makeEmptyNote, NoteDto} from "../../const/dto/Note.dto";
import {UpsertNoteDto} from "../../const/dto/UpsertNote.dto";

export type Context = {
  getNote: () => Promise<NoteDto>;
  noteId: string | undefined;
  upsertNote: (upsertNoteDto: UpsertNoteDto) => Promise<NoteDto | null>;
};

const context = React.createContext<Context | null>(null);

export const NoteEditorContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { noteId } = useParams();
  const api = useApi();

  const [currentNoteId, setCurrentNoteId] = useState(noteId);

  const getNote = async (): Promise<NoteDto> => {
    if (currentNoteId === undefined) {
      return makeEmptyNote();
    }

    const result = await api.getNoteById(currentNoteId);
    if (result === null) {
      return makeEmptyNote();
    }

    return result;
  };

  const upsertNote = async (upsertNoteDto: UpsertNoteDto): Promise<NoteDto | null> => {
    const result = await api.upsertNote(upsertNoteDto);
    if (result !== null) {
      setCurrentNoteId(noteId);
    }

    return result;
  }

  const value: Context = {
    getNote,
    noteId: currentNoteId,
    upsertNote,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useNoteEditor = () => {
  const ctx = React.useContext(context);

  if (!ctx) {
    throw new Error("useNoteEditor may only be called within a context");
  }
  return ctx;
};
