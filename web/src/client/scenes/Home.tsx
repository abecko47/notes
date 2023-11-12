import React, { useEffect, useState } from "react";
import NotesHomepageList from "./NotesHomepageList";
import NotebooksHomepageList from "./NotebooksHomepageList";
import { CircularProgress, TextField } from "@mui/material";
import { useSearch } from "../../ctx/search/context";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
import NotesList from "../components/NotesList";
import NotebooksList from "../components/NotebooksList";

export default function Home() {
  const search = useSearch();
  const [query, setQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResultDto>({
    notes: [],
    notebooks: [],
  });

  const handleSearch = async () => {
    setLoadingSearch(true);
    setSearchResult(
      await search.query({
        query,
      }),
    );
    setLoadingSearch(false);
  };

  useEffect(() => {
    if (query !== "") {
      handleSearch();
    }
  }, [query]);

  return (
    <>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
      />

      {query === "" && (
        <>
          <NotebooksHomepageList />
          <NotesHomepageList />
        </>
      )}

      {query !== "" && loadingSearch ? (
        <CircularProgress />
      ) : (
        <>
          {query !== "" && (
            <>
              <h2>Notebooks</h2>
              <NotebooksList
                onDelete={(notebookId) => {
                  handleSearch();
                }}
                notebooks={searchResult.notebooks}
              />
              <h2>Notes</h2>
              <NotesList notes={searchResult.notes} />
            </>
          )}
        </>
      )}
    </>
  );
}
