import { notFound } from "next/navigation";

import tina from "../../../tina/__generated__/client";

export async function getPages() {
  const pages = await tina.queries.pagesConnection();
  return pages.data.pagesConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPage(relativePath: string) {
  const page = await tina.queries
    .pages({
      relativePath,
    })
    .catch(() => null);

  if (!page) return null;

  return {
    page: page.data.pages,
  };
}

export async function getContentPage(relativePath: string) {
  const content = await getPage(`${relativePath}.mdx`);
  return content?.page ?? notFound();
}
