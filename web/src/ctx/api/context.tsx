import React from "react";
import {useAuth} from "../auth/context";
import {NoteDto} from "../../const/dto/NoteDto";
import axios from "axios";
import {API_URL} from "../../const/config";

export type Context = {
    getNotes: () => Promise<NoteDto[]>;
};

const context = React.createContext<Context | null>(null);

export const ApiContextProvider = ({children}: React.PropsWithChildren<unknown>) => {
    const {authorization} = useAuth();

    const getNotes = async () => {
        const result = await axios.get(`${API_URL}notes`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: authorization,
                }
            }
        );

        console.log({result})

        return result.data;
    }

    const value: Context = {
        getNotes,
    };

    return <context.Provider value={value}>{children}</context.Provider>;
}

export const useApi = () => {
    const ctx = React.useContext(context);

    if (!ctx) {
        throw new Error("useApi may only be called within a context");
    }
    return ctx;
};