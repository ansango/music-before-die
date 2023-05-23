import { notFound } from "next/navigation";

import tina from "../../../tina/__generated__/client";
export async function getAlbums() {
  const albums = await tina.queries.albumsConnection({ first: -1 });
  return albums.data.albumsConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getAlbum(relativePath: string) {
  const album = await tina.queries
    .albums({
      relativePath,
    })
    .catch(() => null);

  if (!album) return null;

  return {
    album: album.data.albums,
  };
}

export async function getContentAlbum(relativePath: string) {
  const content = await getAlbum(`${relativePath}.mdx`);

  return content?.album ?? notFound();
}

export async function getTopRatedAlbums() {
  const albums = await tina.queries.albumsConnection({
    first: -1,
    sort: "rating_DESC",
  });
  return albums.data.albumsConnection.edges?.map((item) => ({ ...item?.node }));
}
