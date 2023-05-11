"use client";

import type { FC, ReactNode } from "react";
import { useContext, createContext } from "react";

import type { Locale } from "@/i18n";
import { getRelations, useGetLocale } from "@/lib";

import type { Global as GlobalContent } from "../../../tina/__generated__/types";
import jsonGlobal from "../../content/global/index.json";

type Global = Partial<GlobalContent>;

export type Props = {
  children: ReactNode;
};

type GlobalContextType = Global;

const GlobalContext = createContext<GlobalContextType>({});

GlobalContext.displayName = "GlobalContext";

export const GlobalProvider: FC<Props> = ({ children }) => {
  return (
    <GlobalContext.Provider value={jsonGlobal as unknown as GlobalContextType}>
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

const defaultNotFound = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  linkLabel: "Go back to the homepage",
  linkHref: "/",
};

export const useNotFound = () => {
  const { locale } = useGetLocale();
  const { notFound } = useGlobalContext();
  return notFound?.[locale] ?? defaultNotFound;
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
