import tina from "../../../tina/__generated__/client";

export async function getGlobal() {
  const globalConnection = await tina.queries.globalConnection();
  return globalConnection.data.globalConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPages() {
  const pages = await tina.queries.pageConnection();
  return pages.data.pageConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getAlbums() {
  const albums = await tina.queries.albumConnection();
  return albums.data.albumConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getArtists() {
  const artists = await tina.queries.artistConnection();
  return artists.data.artistConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPlaylists() {
  const playlists = await tina.queries.playlistConnection();
  return playlists.data.playlistConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPage(relativePath: string) {
  const page = await tina.queries
    .page({
      relativePath,
    })
    .catch(() => null);

  if (!page) return null;

  return {
    page: page.data.page,
  };
}

export async function getAlbum(relativePath: string) {
  const album = await tina.queries
    .album({
      relativePath,
    })
    .catch(() => null);

  if (!album) return null;

  return {
    album: album.data.album,
  };
}

export async function getArtist(relativePath: string) {
  const artist = await tina.queries
    .artist({
      relativePath,
    })
    .catch(() => null);

  if (!artist) return null;

  return {
    artist: artist.data.artist,
  };
}

export async function getPlaylist(relativePath: string) {
  const playlist = await tina.queries
    .playlist({
      relativePath,
    })
    .catch(() => null);

  if (!playlist) return null;

  return {
    playlist: playlist.data.playlist,
  };
}
