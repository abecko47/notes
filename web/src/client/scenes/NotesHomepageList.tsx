import React, {useEffect, useState} from "react";
import {useApi} from "../../ctx/api/context";
import {NoteDto} from "../../const/dto/Note.dto";
import NotesList from "../components/NotesList";

export default function NotesHomepageList() {
    const api = useApi();
    const [notes, setNotes] = useState<NoteDto[]>([]);

    useEffect(() => {
        const run = async () => {
            setNotes(await api.getNotes());
        }

        run();
    }, []);

    return <NotesList notes={notes} />
}