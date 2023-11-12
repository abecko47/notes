import React, {useEffect, useState} from "react";
import {makeEmptyNote, NoteDto} from "../../const/dto/Note.dto";
import {Button, CircularProgress, TextField} from "@mui/material";
import {Textarea} from "@mui/joy";
import {useNoteEditor} from "../../ctx/note-editor/context";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function NoteEditor() {
    const { getNote, noteId } = useNoteEditor();

    const [currentNote, setCurrentNote] = useState<NoteDto>(makeEmptyNote());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            setIsLoading(true);
            setCurrentNote(await getNote());
            setIsLoading(false);
        }

        run();
    }, [getNote, noteId]);

    if (isLoading) {
        return <>
            <CircularProgress />
        </>
    }

    return (
        <>
            <Formik
                initialValues={{ ...currentNote }}
                validate={values => {
                    if (!values.name) {
                        return {
                            name: "Name is required",
                        }
                    }
                    return {};
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log({values})
                }}
            >
                {({
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name}
                        <Textarea
                            name="content"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.content ?? ""}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            Save
                        </Button>
                    </form>
                )}
                {/*{({ isSubmitting }) => (*/}
                {/*    <Form>*/}
                {/*        <TextField type="name" name="name" label="note name" variant="outlined" />*/}
                {/*        <ErrorMessage name="name" component="div" />*/}
                {/*        <Textarea name="content" placeholder="note content" />;*/}
                {/*        <ErrorMessage name="content" component="div" />*/}
                {/*        <Button type="submit" disabled={isSubmitting}>*/}
                {/*            Save*/}
                {/*        </Button>*/}
                {/*    </Form>*/}
                {/*)}*/}
            </Formik>
        </>
    );
}