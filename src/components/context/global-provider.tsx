"use client";

import type { FC, ReactNode } from "react";
import { useContext, createContext } from "react";

import type { Global as GlobalContent } from "../../../tina/__generated__/types";
import jsonGlobal from "../../content/global/index.json";

type Global = Partial<GlobalContent>;

export type Props = {
  children: ReactNode;
};

type GlobalContextType = Global & {
  globalDrawer?: string;
};
const globalDrawer = "app-drawer";
const initialValues: GlobalContextType = {
  ...(jsonGlobal as unknown as GlobalContextType),
  globalDrawer,
};

const GlobalContext = createContext<GlobalContextType>(initialValues);

GlobalContext.displayName = "GlobalContext";

export const GlobalProvider: FC<Props> = ({ children }) => (
  <GlobalContext.Provider value={{ ...initialValues }}>{children}</GlobalContext.Provider>
);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return { ...context };
};
