import React, {useState} from "react";
import { ACCESS_TOKEN } from "../../const/config";
import { SearchResultDto } from "../../const/dto/SearchResult.dto";
import { SearchQueryDto } from "../../const/dto/SearchQuery.dto";
import { useApi } from "../api/context";

export type Context = {
    notify: () => void;
    register: (name: string, listener: () => void) => void;
};

const context = React.createContext<Context | null>(null);

// Basically Observer
export const TagContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [listeners, setListeners] = useState<{ (): void; } []>([]);
        const value: Context = {
            register: (name: string, listener: () => void) => {
                console.log("reg list")
                if (listeners.find(foundListener => foundListener.name === name) === undefined) {
                    setListeners([...listeners, listener])
                }
            },
            notify: () => {
            listeners?.forEach((listener => listener()))
        }
    };

    return <context.Provider value={value}>{children}</context.Provider>;
};

export const useTagsObserver = () => {
    const ctx = React.useContext(context);

    if (!ctx) {
        throw new Error("useTagsObserver may only be called within a context");
    }
    return ctx;
};
