import tina from "../../../tina/__generated__/client";

export async function getGlobal() {
  const globalConnection = await tina.queries.globalConnection();
  return globalConnection.data.globalConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPages() {
  const pages = await tina.queries.pagesConnection();
  return pages.data.pagesConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getAlbums() {
  const albums = await tina.queries.albumsConnection();
  return albums.data.albumsConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getArtists() {
  const artists = await tina.queries.artistsConnection();
  return artists.data.artistsConnection.edges?.map((item) => ({ ...item?.node }));
}

export async function getPlaylists() {
  const playlists = await tina.queries.playlistsConnection();
  return playlists.data.playlistsConnection.edges?.map((item) => ({ ...item?.node }));
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
