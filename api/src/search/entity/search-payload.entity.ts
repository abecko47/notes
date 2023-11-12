import {Note, Notebook} from "@prisma/client";

export class SearchPayload {
    notes: Note[]
    notebooks: Notebook[]
}