import type { Locale } from "@/i18n";

import globalData from "../content/global/index.json";

//This function takes a string and replaces every character with a symbol with an empty string
//It also replaces any space with a dash
//It then returns the string in lowercase

export const kebabParser = (str: string): string =>
  str
    .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[]\\\/]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

// kebabCase takes a string and converts it into kebab case, which is a case style
// where all letters are lowercase and words are separated by dashes. This function
// accepts a string and returns a string.

export const kebabCase = (str: string): string => {
  const matcher = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);

  return (matcher && matcher.map((x) => x.toLowerCase()).join("-")) ?? "";
};

export const formatDate = (
  date: string | number | Date,
  locale = "es-ES",
  options?: Intl.DateTimeFormatOptions
) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const _options = options || defaultOptions;
  const now = new Date(date).toLocaleDateString(locale, _options);

  return now;
};

const replaces = ["src/content/pages", ".mdx", "/index"];

export const replacePath = (path: string) =>
  replaces.reduce((acc, curr) => acc.replaceAll(curr, ""), path);

export const localeGlobalData: Record<Locale, (typeof globalData)[Locale]> = {
  en: globalData["en"],
  es: globalData["es"],
};

export const getRelations = (pathname: string, document: Array<Record<Locale, string>>) =>
  document
    .map((relation) =>
      Object.values(relation).map((value) =>
        replaces.reduce((acc, curr) => acc.replaceAll(curr, ""), value)
      )
    )
    .find((relation) => relation.some((value) => value.includes(pathname)));
