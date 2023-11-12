import React, {useEffect, useState} from "react";
import {makeEmptyNote, NoteDto} from "../../const/dto/Note.dto";
import {CircularProgress, TextField} from "@mui/material";
import {Textarea} from "@mui/joy";
import {useNoteEditor} from "../../ctx/note-editor/context";

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
    }, [noteId]);

    if (isLoading) {
        return <>
            <CircularProgress />
        </>
    }

    return <>
        <TextField id="name" label="note name" variant="outlined" />
        <Textarea placeholder="note content" />;
    </>
}