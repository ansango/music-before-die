// import type { Locale } from "@/i18n";
// import { i18n } from "@/i18n";
import { useGetLocale } from "@/lib";

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

// const useGetAllDocuments = (): Array<Record<Locale, { href: string; label: string }>> | null => {
//   const { paths } = useGlobalContext();
//   if (!paths) return null;
//   return Object.values(paths).reduce((acc: any, curr: any) => {
//     const _acc = [...acc];
//     const _curr = [...curr];
//     return [..._acc, ..._curr];
//   }, []);
// };

// export const useCustomRouter = () => {
//   const { pathname, locale } = useGetLocale();
//   const allDocuments = useGetAllDocuments() ?? [];
//   const currentDocs = allDocuments.map((doc) => {
//     return { ...doc[locale], href: replacePath(doc[locale].href) };
//   });

//   const redirect = (locale: Locale) => {
//     const path =
//       getRelations(pathname, allDocuments)?.find((relation) => relation.includes(locale)) ?? `/`;
//     console.log(path);
//     return path;
//   };

//   return { locale, redirect, allDocuments, currentDocs };
// };
