/* eslint-disable @typescript-eslint/no-var-requires */
const { lastFmClient } = require("lastfm-client-ts");
const { artistApiMethods } = lastFmClient();
const { default: slugify } = require("slugify");

const { getLocalArtists } = require("../common");

const { optionsSlugify } = require("./config");

async function getTopArtistMatter(dataUserArtists) {
  const localArtistsRoutes = getLocalArtists();

  const data = dataUserArtists.filter((name) => {
    const route = `src/content/artists/${slugify(name, optionsSlugify)}.mdx`;
    return !localArtistsRoutes.includes(route);
  });

  const populatedInfo = await Promise.all(
    data.map(async (name) => {
      const artistData = await artistApiMethods.getInfo({ artist: name });
      const genres =
        artistData.artist?.tags?.tag?.map(({ name }) => slugify(name, optionsSlugify)) ?? [];
      const artist = slugify(name, optionsSlugify);

      const body = artistData.artist?.bio?.content ?? "";

      return {
        name,
        artist,
        body,
        genres,
      };
    })
  );

  return populatedInfo;
}

module.exports = {
  getTopArtistMatter,
};
