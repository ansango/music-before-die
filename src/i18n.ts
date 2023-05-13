export const i18n = {
  defaultLocale: "es",
  locales: ["en", "es", "it"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
