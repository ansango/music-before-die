import tinaClient from "../../../tina/__generated__/client";

export async function getPageConnectionEn() {
  return (await tinaClient.queries.en_pageConnection()).data.en_pageConnection.edges?.map(
    (edge) => edge?.node
  );
}

export async function getPageConnectionEs() {
  return (await tinaClient.queries.es_pageConnection()).data.es_pageConnection.edges?.map(
    (edge) => edge?.node
  );
}

export async function getAllPagesConnection() {
  const pagesEn =
    (await tinaClient.queries.en_pageConnection()).data.en_pageConnection.edges?.map(
      (edge) => edge?.node
    ) || [];

  const pagesEs =
    (await tinaClient.queries.es_pageConnection()).data.es_pageConnection.edges?.map(
      (edge) => edge?.node
    ) || [];

  return [...pagesEn, ...pagesEs];
}
