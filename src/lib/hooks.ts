"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n";

import relationsJson from "../content/relations.json";

import { getRelations, localeGlobalData } from "./utils";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const useGetLocale = () => {
  let pathname = usePathname();
  if (!pathname) pathname = "/";
  const segments = pathname.split("/");

  const redirectedPathName = (locale: Locale) => {
    const path =
      getRelations(pathname, relationsJson.relations)?.find((relation) =>
        relation.includes(locale)
      ) ?? `/`;

    return path;
  };

  return { locale: segments[1] as Locale, redirectedPathName };
};

export const useGlobalData = () => {
  const { locale } = useGetLocale();
  const data = localeGlobalData[locale];
  return { locale, ...data };
};
