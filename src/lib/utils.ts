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
  return new Date(date).toLocaleDateString(locale, _options);
};

export const replaceSrc = (
  url: string,
  collection: "albums" | "artists" | "pages" | "playlists",
  segment: string
) => url.replaceAll("src/content", "").replaceAll(".mdx", "").replaceAll(collection, segment);
