import tinaClient from "../../../tina/__generated__/client";

export async function getPageConnection() {
  return (await tinaClient.queries.pageConnection()).data.pageConnection.edges?.map(
    (edge) => edge?.node
  );
}
