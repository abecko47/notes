import React, { useState } from "react";

export type Context = {
  notify: () => void;
  register: (name: string, listener: () => void) => void;
};

const context = React.createContext<Context | null>(null);

// Basically Observer
export const TagContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [listeners, setListeners] = useState<Map<string, { (): void } | undefined>>(new Map());
  const value: Context = {
    register: (name: string, listener: () => void) => {
      setListeners(new Map(listeners.set(name, listener)));
    },
    notify: () => {
      listeners.forEach((listener) => {
        if (listener !== undefined) {
          listener();
        }
      });
    },
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
