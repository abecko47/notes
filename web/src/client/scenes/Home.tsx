import React, { useEffect, useState } from "react";
import NotesHomepageList from "./NotesHomepageList";
import NotebooksHomepageList from "./NotebooksHomepageList";
import {Button, CircularProgress, TextField} from "@mui/material";
import { useSearch } from "../../ctx/search/context";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
import NotesList from "../components/NotesList";
import NotebooksList from "../components/NotebooksList";
import { useTagsObserver } from "../../ctx/tag-update/context";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";
import {useAuth} from "../../ctx/auth/context";

export default function Home() {
  const search = useSearch();
  const { register } = useTagsObserver();
  const navigate = useNavigate();
  const auth = useAuth();

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

    register("search", () => {
      if (query !== "") {
        handleSearch();
      }
    });
  }, [query]);

  return (
    <>
      <h1>Super notes</h1>
      <Button onClick={() => auth.signOut()}>Sign out</Button>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
      />

      <Button onClick={() => {
        navigate("/note");
      }}>New note</Button>

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
