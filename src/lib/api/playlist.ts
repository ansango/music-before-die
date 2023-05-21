import { notFound } from "next/navigation";

import tina from "../../../tina/__generated__/client";

export async function getPlaylists() {
  const playlists = await tina.queries.playlistsConnection({ first: -1 });
  return playlists.data.playlistsConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPlaylist(relativePath: string) {
  const playlist = await tina.queries
    .playlists({
      relativePath,
    })
    .catch(() => null);

  if (!playlist) return null;

  return {
    playlist: playlist.data.playlists,
  };
}

export async function getContentPlaylist(relativePath: string) {
  const content = await getPlaylist(`${relativePath}.mdx`);
  return content?.playlist ?? notFound();
}
