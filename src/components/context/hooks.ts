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
