import React, { useEffect, useState } from "react";
import { makeEmptyNote, NoteDto } from "../../const/dto/Note.dto";
import { Button, CircularProgress, TextField } from "@mui/material";
import {Divider, Grid, Textarea} from "@mui/joy";
import { useNoteEditor } from "../../ctx/note-editor/context";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AssignNotebook from "../components/AssignNotebook";
import {
  makeEmptyNotebook,
  makeEmptyNotebookForAssign,
} from "../../const/dto/AddRemoveNotebook.dto";
import { useApi } from "../../ctx/api/context";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import TagManager from "../components/TagManager";
import { useTagsObserver } from "../../ctx/tag-update/context";
import RootLayout from "../components/RootLayout";
import {AssignNotebookContainer, LastGridItem, SmallText} from "../components/StyledComponents";

export default function NoteEditor() {
  const { getNote, noteId, upsertNote, setCurrentNoteId } = useNoteEditor();
  const { removeNote } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useTagsObserver();

  const [currentNote, setCurrentNote] = useState<NoteDto>(makeEmptyNote());
  const [tagManagerNote, setTagManagerNote] = useState<NoteDto>(makeEmptyNote());

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      const fetchedNote = await getNote();
      setCurrentNote(fetchedNote);
      setTagManagerNote(fetchedNote);
      setIsLoading(false);
    };

    run();
  }, [getNote, noteId, location.key]);

  const updateTagManagerNote = async () => {
    setIsLoading(true);
    setTagManagerNote(await getNote());
    setIsLoading(false);
  };

  useEffect(() => {
    register("noteEditor", () => {
      updateTagManagerNote();
    });
  }, [location.key]);

  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <RootLayout>
      <Grid alignItems={"center"} container xs={12}>
        <Grid xs={3}>
          <h1>{currentNote.id !== "" ? <>Edit note</> : <>Add new note</>}</h1>
        </Grid>
          {currentNote.id !== "" && (<LastGridItem xs={9}>
              <Button
                  name={"delete-note"}
                  variant={"contained"}
                  color={"error"}
                  onClick={async () => {
                      setIsLoading(true);
                      const result = await removeNote(currentNote.id);

                      if (!result) {
                          alert("Some error happened");
                          setIsLoading(false);
                          return null;
                      }

                      alert("Successfully deleted.");
                      setIsLoading(false);
                      navigate("/home");
                  }}
              >
                  Delete note
              </Button>
          </LastGridItem>)}

      </Grid>


      {currentNote.id !== "" && (
        <Grid xs={12}>
          <Grid alignItems={"center"} container xs={12}>
            <Grid xs={3}>
              <span>Choose available notebook to assign this note</span>
            </Grid>
            <AssignNotebookContainer xs={3}>
              <AssignNotebook
                  noteId={currentNote.id}
                  defaultNotebook={currentNote.notebook ?? makeEmptyNotebook()}
              />
            </AssignNotebookContainer>
          </Grid>
            <Grid xs={12}>
                <SmallText>If you need new notebook, please go back and create one</SmallText>
            </Grid>
            <Grid xs={12}>
                <Divider />
            </Grid>
            {
                tagManagerNote.id !== "" && (
                    <Grid xs={3}>
                        <TagManager
                            noteId={tagManagerNote.id}
                            tagAffinity={"note"}
                            notesAndTags={tagManagerNote.notesAndTags}
                        />
                    </Grid>
                )
            }

        </Grid>
      )}

      {currentNote.id === "" && (
          <Grid xs={12}>
              <SmallText>You will be able to assign note to notebook and assign tags to note after creating the new note.</SmallText>
        </Grid>
      )}

        <Grid xs={12}>
      <Formik
        initialValues={{ ...currentNote }}
        enableReinitialize
        validate={(values) => {
          if (!values.name) {
            return {
              name: "Name is required",
            };
          }
          return {};
        }}
        onSubmit={async (values, { setSubmitting }) => {
            const newNote = values.id === "";
          const note = await upsertNote({
            ...values,
            notebookId: currentNote.notebookId ?? undefined,
          });

          if (note) {
            if (newNote) {
                setCurrentNoteId(note.id);
                navigate(`/note/${note.id}`);
            }
            alert("Success.");
          }

          setSubmitting(false);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

            <form onSubmit={handleSubmit}>
                <Grid spacing={1} container xs={12}>
                    <Grid xs={12}>
                        <TextField
                            type="name"
                            name="name"
                            label={"Note name"}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                    </Grid>
                    <Grid xs={12}>
                        {errors.name}
                    </Grid>
                    <Grid xs={12}>
                        <Textarea
                            name="content"
                            minRows={10}
                            placeholder={"Note content"}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.content ?? ""}
                        />
                    </Grid>
                    <Grid xs={12}>
            <Button variant={"contained"} type="submit" disabled={isSubmitting}>
              Save
            </Button>
                    </Grid>
                </Grid>
          </form>

        )}
      </Formik>
        </Grid>
    </RootLayout>
  );
}
