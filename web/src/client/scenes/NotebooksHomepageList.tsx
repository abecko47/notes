import React, {useEffect, useState} from "react";
import {useApi} from "../../ctx/api/context";
import {NoteDto} from "../../const/dto/Note.dto";
import {NotebookDto} from "../../const/dto/Notebook.dto";
import NotebooksList from "../components/NotebooksList";

export default function NotebooksHomepageList() {
    const api = useApi();
    const [notebooks, setNotebooks] = useState<NotebookDto[]>([]);

    useEffect(() => {
        const run = async () => {
            setNotebooks(await api.getNotebooks());
        }

        run();
    }, [api]);

    return <NotebooksList notebooks={notebooks} />
}