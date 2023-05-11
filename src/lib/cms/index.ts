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
    page: page.data.page,
    global: page.data.global,
  };
}

export async function getGlobal() {
  const globalConnection = await tina.queries.globalConnection();
  return globalConnection.data.globalConnection.edges?.map((item) => ({ ...item?.node }));
}
