import React from "react";
import { ACCESS_TOKEN } from "../../const/config";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { SearchQueryDto } from "../../const/dto/SearchQuery.dto";
import { useApi } from "../api/context";

export type Context = {
  query: (query: SearchQueryDto) => Promise<SearchResultDto>;
};

const context = React.createContext<Context | null>(null);

export const SearchContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const api = useApi();
  const query = async (query: SearchQueryDto) => {
    return await api.search(query);
  };

  const value: Context = {
    query,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useSearch = () => {
  const ctx = React.useContext(context);

  if (!ctx) {
    throw new Error("useSearch may only be called within a context");
  }
  return ctx;
};
