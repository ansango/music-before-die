"use client";

import type { FC, ReactNode } from "react";
import { useContext, createContext } from "react";

import type { Locale } from "@/i18n";
import { getRelations, useGetLocale } from "@/lib";

import type { Global as GlobalContent } from "../../../tina/__generated__/types";

type Global = Partial<GlobalContent>;

export type Props = {
  children: ReactNode;
} & Global;

type GlobalContextType = Global;

const GlobalContext = createContext<GlobalContextType>({});

GlobalContext.displayName = "GlobalContext";

export const GlobalProvider: FC<Props> = ({ children, ...props }) => {
  const { paths, social } = props;
  return (
    <GlobalContext.Provider
      value={{
        paths,
        social,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return { ...context };
};

const useGetAllDocuments = () => {
  const { locale } = useGetLocale();
  const { paths } = useGlobalContext();
  return { documents: [] as Array<Record<Locale, string>> };
};

export const useLocale = () => {
  const { pathname, locale } = useGetLocale();
  const { documents } = useGetAllDocuments();
  const redirectPathName = (locale: Locale) => {
    const path =
      getRelations(pathname, documents)?.find((relation) => relation.includes(locale)) ?? `/`;

    return path;
  };

  return { locale, redirectPathName };
};
