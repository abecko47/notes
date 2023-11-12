import React, {useEffect, useState} from "react";
import {useApi} from "../../ctx/api/context";
import {NoteDto} from "../../const/dto/NoteDto";

export default function NotesList() {
    const api = useApi();
    const [notes, setNotes] = useState<NoteDto[]>([]);

    useEffect(() => {
        const run = async () => {
            setNotes(await api.getNotes());
        }

        run();
    }, []);

    return <>{notes.map(note => (<div>{note.name}</div>))}</>
}