import {NoteDto} from "./Note.dto";
import {NotebookDto} from "./Notebook.dto";

export type SearchResultDto = {
    notes: NoteDto[];
    notebooks: NotebookDto[];
}
