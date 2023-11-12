import { LoginUserDto } from "../../const/dto/LoginUser.dto";
import { LoginResultDto } from "../../const/dto/LoginResult.dto";
import React from "react";
import { ACCESS_TOKEN } from "../../const/config";
import { useParams } from "react-router-dom";
import { useApi } from "../api/context";
import { makeEmptyNote, NoteDto } from "../../const/dto/Note.dto";

export type Context = {
  getNote: () => Promise<NoteDto>;
  noteId: string | undefined;
};

const context = React.createContext<Context | null>(null);

export const NoteEditorContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { noteId } = useParams();
  const api = useApi();

  const getNote = async (): Promise<NoteDto> => {
    if (noteId === undefined) {
      return makeEmptyNote();
    }

    const result = await api.getNoteById(noteId);
    if (result === null) {
      return makeEmptyNote();
    }

    return result;
  };

  const value: Context = {
    getNote,
    noteId,
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
