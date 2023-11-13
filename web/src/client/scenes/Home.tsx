import React, { useEffect, useState } from "react";
import NotesHomepageList from "./NotesHomepageList";
import NotebooksHomepageList from "./NotebooksHomepageList";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useSearch } from "../../ctx/search/context";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
import NotesList from "../components/NotesList";
import NotebooksList from "../components/NotebooksList";
import { useTagsObserver } from "../../ctx/tag-update/context";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../../ctx/auth/context";
import RootLayout from "../components/RootLayout";
import { Grid } from "@mui/joy";
import { LastGridItem, FullWidthTextField } from "../components/StyledComponents";

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
    <RootLayout>
      <Grid container alignItems={"center"} xs={12}>
        <Grid xs={2}>
          <h1>Note App</h1>
        </Grid>
        <Grid xs={8}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/note");
            }}
          >
            Add new note
          </Button>
        </Grid>
        <LastGridItem xs={2}>
          <Button onClick={() => auth.signOut()}>Sign out</Button>
        </LastGridItem>
      </Grid>
      <Grid padding={0} xs={12}>
        <FullWidthTextField
          id="search"
          label="Search"
          variant="outlined"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
        />
      </Grid>

      {query === "" && (
        <>
          <Grid container xs={12}>
            <NotebooksHomepageList />
          </Grid>
          <Grid container xs={12}>
            <NotesHomepageList />
          </Grid>
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
                onDelete={() => {
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
    </RootLayout>
  );
}
