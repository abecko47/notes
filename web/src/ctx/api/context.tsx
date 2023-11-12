import React from "react";
import { useAuth } from "../auth/context";
import axios from "axios";
import { API_URL } from "../../const/config";
import { NoteDto } from "../../const/dto/Note.dto";
import { NotebookDto } from "../../const/dto/Notebook.dto";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { SearchQueryDto } from "../../const/dto/SearchQuery.dto";

export type Context = {
  getNotes: () => Promise<NoteDto[]>;
  getNoteById: (id: string) => Promise<NoteDto | null>;
  getNotebooks: () => Promise<NotebookDto[]>;
  search: (searchQuery: SearchQueryDto) => Promise<SearchResultDto>;
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
    const result = await axios.get(`${API_URL}note/${id}`, {
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
