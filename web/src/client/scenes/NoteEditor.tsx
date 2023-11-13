import React, { useEffect, useState } from "react";
import { makeEmptyNote, NoteDto } from "../../const/dto/Note.dto";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useNoteEditor } from "../../ctx/note-editor/context";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AssignNotebook from "../components/AssignNotebook";
import {
  makeEmptyNotebook,
  makeEmptyNotebookForAssign,
} from "../../const/dto/AddRemoveNotebook.dto";
import { useApi } from "../../ctx/api/context";
import { Navigate, useNavigate } from "react-router-dom";
import TagManager from "../components/TagManager";
import { useTagsObserver } from "../../ctx/tag-update/context";

export default function NoteEditor() {
  const { getNote, noteId, upsertNote } = useNoteEditor();
  const { removeNote } = useApi();
  const navigate = useNavigate();
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
  }, [getNote, noteId]);

  const updateTagManagerNote = async () => {
    setIsLoading(true);
    setTagManagerNote(await getNote());
    setIsLoading(false);
  };

  useEffect(() => {
    register("noteEditor", () => {
      updateTagManagerNote();
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <h1>{currentNote.id !== "" ? <>Edit note</> : <>Add new note</>}</h1>
      {currentNote.id !== "" && (
        <>
          <AssignNotebook
            noteId={currentNote.id}
            defaultNotebook={currentNote.notebook ?? makeEmptyNotebook()}
          />
          <TagManager
            noteId={tagManagerNote.id}
            tagAffinity={"note"}
            notesAndTags={tagManagerNote.notesAndTags}
          />
          <Button
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
        </>
      )}

      {currentNote.id === "" && (
        <>
          you will be able to assign note to notebook and assign tags to note after creating the new
          note.
        </>
      )}

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
          const note = await upsertNote({
            ...values,
            notebookId: currentNote.notebookId ?? undefined,
          });

          if (note) {
            setCurrentNote(note);
            setTagManagerNote(note);
            alert("Success.");
          }

          setSubmitting(false);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              type="name"
              name="name"
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name}
            <Textarea
              name="content"
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content ?? ""}
            />
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}
