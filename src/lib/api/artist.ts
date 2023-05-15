import { notFound } from "next/navigation";

import tina from "../../../tina/__generated__/client";

export async function getArtists() {
  const artists = await tina.queries.artistsConnection();
  return artists.data.artistsConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getArtist(relativePath: string) {
  const artist = await tina.queries
    .artists({
      relativePath,
    })
    .catch(() => null);

  if (!artist) return null;

  return {
    artist: artist.data.artists,
  };
}

export async function getContentArtist(relativePath: string) {
  const content = await getArtist(`${relativePath}.mdx`);
  return content?.artist ?? notFound();
}
