import { useGlobalContext } from "./global-provider";

const defaultNotFound = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  linkLabel: "Go back to the homepage",
  linkHref: "/",
};

export const useNotFound = () => {
  const { notFound } = useGlobalContext();
  return { ...(notFound ?? defaultNotFound) };
};

export const usePagesNavigation = () => {
  const { sitemap } = useGlobalContext();

  const sections = sitemap?.sections
    ?.map((section) => ({
      label: section?.label,
      link: section?.link?.id
        ?.replaceAll("src/content/pages", "")
        .replaceAll(".mdx", "")
        .replaceAll("index", ""),
    }))
    .filter((section) => section?.link);

  return sections;
};
