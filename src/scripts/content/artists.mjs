import { lastFmClient } from "lastfm-client-ts";
const { artistApiMethods } = lastFmClient();
import { default as slugify } from "slugify";

import { getLocalArtists, parseGenres } from "../common.mjs";

import { optionsSlugify } from "./config.mjs";

export async function getArtistMatter(dataUserArtists) {
  const localArtistsRoutes = getLocalArtists();

  const data = dataUserArtists.filter((name) => {
    const route = `src/content/artists/${slugify(name, optionsSlugify)}.mdx`;
    return !localArtistsRoutes.includes(route);
  });

  const populatedInfo = await Promise.all(
    data.map(async (name) => {
      const artistData = await artistApiMethods.getInfo({ artist: name });
      const genres = parseGenres(artistData.artist?.tags?.tag ?? []);
      const artist = slugify(name, optionsSlugify);

      return {
        name,
        artist,
        genres,
      };
    })
  );

  return populatedInfo;
}
