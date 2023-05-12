import type { Locale } from "@/i18n";

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

export const getRelations = (
  pathname: string,
  documents: Array<Record<Locale, { href: string; label: string }>>
) =>
  documents
    .map((relation) =>
      Object.values(relation).map((value) =>
        replaces.reduce((acc, curr) => acc.replaceAll(curr, ""), value.href)
      )
    )
    .find((relation) => relation.some((value) => value.includes(pathname)));
