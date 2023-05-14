import { i18n } from "@/i18n";
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

const removeLocale = (pathname: string) => pathname.split("/").slice(2).join("/");
const removeLastBySlug = (pathname: string) =>
  `${pathname.split("/").slice(0, -1).join("/")}/:slug`;

const getRestAfterCollection = (pathname: string) => `${pathname.split("/").slice(3).join("/")}`;

const useMappedRewrites = () => {
  const { rewrites } = useGlobalContext();
  return rewrites?.map(({ destination: _destination, source }) => {
    const destination = `/${removeLocale(_destination)}`;

    return {
      source,
      destination,
    };
  });
};

export const useLocaleSwitcher = () => {
  const { locale, pathname } = useGetLocale();
  const rewrites = useMappedRewrites();
  const isPathnameCollection = pathname.split("/").slice(1).length > 2;
  const pathnameParsed = isPathnameCollection ? removeLastBySlug(pathname) : pathname;
  const destination = rewrites?.find(({ source }) => source === pathnameParsed)?.destination;
  const destinations = rewrites
    ?.filter((r) => r.destination === destination)
    .map((r) => {
      const locale = i18n.locales.find((l) => l === r.source.split("/")[1]);
      const link = r.source.replace(":slug", getRestAfterCollection(pathname));
      return {
        locale,
        link,
      };
    });

  return { locale, destinations };
};
