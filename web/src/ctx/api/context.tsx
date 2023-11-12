import React from "react";
import { useAuth } from "../auth/context";
import axios from "axios";
import { API_URL } from "../../const/config";
import { makeEmptyNote, NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { SearchQueryDto } from "../../const/dto/SearchQuery.dto";
import { UpsertNoteDto } from "../../const/dto/UpsertNote.dto";
import { AddRemoveNotebookDto } from "../../const/dto/AddRemoveNotebook.dto";

export type Context = {
  getNotes: () => Promise<NoteDto[]>;
  getNoteById: (id: string) => Promise<NoteDto | null>;
  getNotebooks: () => Promise<NotebookDto[]>;
  search: (searchQuery: SearchQueryDto) => Promise<SearchResultDto>;
  upsertNote: (noteDto: UpsertNoteDto) => Promise<NoteDto | null>;
  addNotebook: (addRemoveNotebookDto: AddRemoveNotebookDto) => Promise<NotebookDto | null>;
  removeNotebook: (addRemoveNotebookDto: AddRemoveNotebookDto) => Promise<NotebookDto | null>;
};

const context = React.createContext<Context | null>(null);

export const ApiContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { authorization, signOut } = useAuth();

  const getNotes = async (): Promise<NoteDto[]> => {
    const result = await axios.get(`${API_URL}notes`, {
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
      validateStatus: () => true,
    });

    if (result.status === 401) {
      signOut();
      return [];
    }

    return result.data;
  };

  const getNoteById = async (id: string): Promise<NoteDto | null> => {
    const result = await axios.get(`${API_URL}notes/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
      validateStatus: () => true,
    });

    if (result.status === 404) {
      alert("Note has been not found.");
      return null;
    }

    if (result.status === 401) {
      signOut();
      return null;
    }

    return result.data;
  };

  const upsertNote = async (upsertNoteDto: UpsertNoteDto): Promise<NoteDto | null> => {
    if (upsertNoteDto.id !== "") {
      const result = await axios.patch(
        `${API_URL}notes/${upsertNoteDto.id}`,
        {
          ...upsertNoteDto,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: authorization,
          },
          validateStatus: () => true,
        },
      );

      if (result.status === 401) {
        signOut();
        return null;
      }

      if (result.status > 201) {
        alert("Some error happened.");
        return null;
      }

      return result.data;
    }

    const result = await axios.post(
      `${API_URL}notes/${upsertNoteDto.id}`,
      {
        ...upsertNoteDto,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
        },
        validateStatus: () => true,
      },
    );

    if (result.status === 401) {
      signOut();
      return null;
    }

    if (result.status > 201) {
      alert("Some error happened.");
      return null;
    }

    return result.data;
  };

  const getNotebooks = async (): Promise<NotebookDto[]> => {
    const result = await axios.get(`${API_URL}notebooks`, {
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
      validateStatus: () => true,
    });

    if (result.status === 401) {
      signOut();
      return [];
    }

    return result.data;
  };

  const addNotebook = async (
    addRemoveNotebookDto: AddRemoveNotebookDto,
  ): Promise<NotebookDto | null> => {
    const result = await axios.post(
      `${API_URL}notebooks/`,
      {
        ...addRemoveNotebookDto,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
        },
        validateStatus: () => true,
      },
    );

    if (result.status === 401) {
      signOut();
      return null;
    }

    return result.data;
  };

  const removeNotebook = async (
    addRemoveNotebookDto: AddRemoveNotebookDto,
  ): Promise<NotebookDto | null> => {
    if (addRemoveNotebookDto.id === undefined) {
      return null;
    }

    const result = await axios.delete(`${API_URL}notebooks/${addRemoveNotebookDto.id}`, {
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
      validateStatus: () => true,
    });

    if (result.status === 401) {
      signOut();
      return null;
    }

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  };

  const search = async (query: SearchQueryDto): Promise<SearchResultDto> => {
    const result = await axios.post(
      `${API_URL}search`,
      {
        ...query,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
        },
        validateStatus: () => true,
      },
    );

    if (result.status === 401) {
      signOut();
      return {
        notes: [],
        notebooks: [],
      };
    }

    return result.data;
  };

  const value: Context = {
    getNotes,
    getNotebooks,
    search,
    getNoteById,
    upsertNote,
    addNotebook,
    removeNotebook,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useApi = () => {
  const ctx = React.useContext(context);

  if (!ctx) {
    throw new Error("useApi may only be called within a context");
  }
  return ctx;
};
