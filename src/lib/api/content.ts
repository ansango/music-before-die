import tina from "../../../tina/__generated__/client";

export async function getGlobal() {
  const globalConnection = await tina.queries.globalConnection({ first: -1 });
  return globalConnection.data.globalConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getContent() {
  const contentConnection = await tina.queries.content();
  return contentConnection.data.global;
}
