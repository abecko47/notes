import React, {useEffect, useState} from "react";
import {NoteDto} from "../../const/dto/Note.dto";
import {NotebookDto} from "../../const/dto/Notebook.dto";

export type NotebooksListArgs = {
    notebooks: NotebookDto[];
}

export default function NotebooksList({notebooks}: NotebooksListArgs) {
    return <>{notebooks.map(notebook => (<div>{notebook.name}</div>))}</>
}