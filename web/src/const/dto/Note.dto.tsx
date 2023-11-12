export type NoteDto = {
    id: string;
    name: string;
    content: string | null;
}

export const makeEmptyNote = (): NoteDto => {
    return {
        id: "",
        name: "",
        content: null,
    };
}