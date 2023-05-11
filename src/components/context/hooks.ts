import type { Locale } from "@/i18n";
import { getRelations, useGetLocale } from "@/lib";

import { useGlobalContext } from "./global-provider";

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
  console.log(paths);
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
