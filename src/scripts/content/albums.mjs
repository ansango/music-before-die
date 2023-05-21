import { lastFmClient } from "lastfm-client-ts";
const { userApiMethods, artistApiMethods } = lastFmClient();
import { default as slugify } from "slugify";

import { parseGenres, getLocalAlbums } from "../common.mjs";

import { config, optionsSlugify } from "./config.mjs";

export async function getTopAlbumsMatter() {
  const dataUserAlbums = await userApiMethods.getTopAlbums(config);
  const localAlbumsRoutes = getLocalAlbums();
  const data = dataUserAlbums.topalbums.album.filter(({ name, artist: { name: artistName } }) => {
    const route = `src/content/albums/${slugify(artistName, optionsSlugify)}/${slugify(
      name,
      optionsSlugify
    )}.mdx`;
    return !localAlbumsRoutes.includes(route);
  });

  const populatedInfo = await Promise.all(
    data.map(async ({ name, artist }) => {
      const artistData = await artistApiMethods.getInfo({ artist: artist.name });
      const genres = parseGenres(artistData.artist?.tags?.tag ?? []);
      const artistSlug = slugify(artist.name, optionsSlugify);
      return {
        name,
        nameSlug: slugify(name, optionsSlugify),
        artistReference: `src/content/artists/${artistSlug}.mdx`,
        artistSlug,
        artist: artist.name,
        release: new Date().toISOString(),
        genres,
      };
    })
  );

  return populatedInfo;
}
