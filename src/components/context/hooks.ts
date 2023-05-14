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
  return { ...(notFound?.[locale] ?? defaultNotFound), locale };
};

export const usePagesNavigation = () => {
  const { locale } = useGetLocale();
  const { sitemap: _sitemap } = useGlobalContext();
  const sitemap = _sitemap?.[locale];

  return sitemap?.sections
    ?.flatMap((section) =>
      section?.link?.segments.map(({ value }) => ({
        label: section.label,
        link: value ? `/${locale}${value}`.replace(/\/(?!.*\w)/, "") : undefined,
      }))
    )
    .filter((segment) => segment?.link);
};
