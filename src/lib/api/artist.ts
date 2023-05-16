import { notFound } from "next/navigation";
import slugify from "slugify";

import tina from "../../../tina/__generated__/client";
import type { Artists } from "../../../tina/__generated__/types";

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

export async function getArtistsWithGenre() {
  const artists = await getArtists();
  return artists?.map(({ albums, ...artist }) => ({
    ...artist,
    albums,
    genres: albums?.flatMap((album) => album?.album.genres) || ([] as Array<string>),
  }));
}

export type ArtistWithGenres = {
  genres: Array<string>;
  _sys?: {
    filename: string;
  };
  name: string;
};

export function matchArtistByGenre(genre: string, artists?: Array<ArtistWithGenres>) {
  return artists?.filter((artist) => artist.genres?.includes(slugify(genre, { lower: true })));
}

export async function getArtistsByGenre(genre: string) {
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;
  return matchArtistByGenre(genre, artists);
}

export async function getArtistsByLetter(letter: string) {
  const artists = await getArtists();
  console.log(artists);
  return artists?.filter((artist) => artist.name?.toLowerCase()?.startsWith(letter));
}

export function matchArtistByLetter(letter: string, artists?: Array<Artists>) {
  return artists?.filter((artist) => artist.name.toLowerCase()?.startsWith(letter));
}
