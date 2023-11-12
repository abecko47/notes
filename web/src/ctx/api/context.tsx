import React from "react";

export type Context = {
};

const context = React.createContext<Context | null>(null);

export const ApiContextProvider = ({children}: React.PropsWithChildren<unknown>) => {
    const value: Context = {
    };

    return <context.Provider value={value}>{children}</context.Provider>;
}

export const useApi = () => {
    const ctx = React.useContext(context);

    if (!ctx) {
        throw new Error("useApi may only be called within a context"); // eslint-disable-line fp/no-throw
    }
    return ctx;
};