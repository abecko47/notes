export type EditNoteAndTagDto = {
    tagName: string;
    noteId: string;
    action: 'assign' | 'remove';
}