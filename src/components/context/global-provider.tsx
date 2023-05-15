"use client";

import type { FC, PropsWithChildren } from "react";
import { useContext, createContext } from "react";

import type { ContentQuery as GlobalContent } from "../../../tina/__generated__/types";

type Global = Partial<GlobalContent["global"]>;

type GlobalContextType = Global & {
  globalDrawer?: string;
};
const globalDrawer = "app-drawer";

const initialValues: GlobalContextType = {
  globalDrawer,
};

const GlobalContext = createContext<GlobalContextType>(initialValues);

GlobalContext.displayName = "GlobalContext";

export const GlobalProvider: FC<PropsWithChildren<{ content?: Global }>> = ({
  children,
  content,
}) => (
  <GlobalContext.Provider value={{ ...initialValues, ...content }}>
    {children}
  </GlobalContext.Provider>
);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return { ...context };
};
