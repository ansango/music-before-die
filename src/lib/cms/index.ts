import tina from "../../../tina/__generated__/client";

export async function getPages() {
  const pages = await tina.queries.pageConnection();
  return pages.data.pageConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPage(relativePath: string) {
  const page = await tina.queries
    .contentQuery({
      relativePath,
    })
    .catch(() => null);

  if (!page) return null;

  return {
    ...page.data.page,
  };
}
