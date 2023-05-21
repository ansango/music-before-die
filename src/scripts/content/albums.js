/* eslint-disable @typescript-eslint/no-var-requires */
const { lastFmClient } = require("lastfm-client-ts");
const { userApiMethods, albumApiMethods, artistApiMethods } = lastFmClient();
const { default: slugify } = require("slugify");

const { getLocalAlbums } = require("../common");

const { config, optionsSlugify } = require("./config");

async function getTopAlbumsMatter() {
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
      const genres =
        artistData.artist?.tags?.tag?.map(({ name }) => slugify(name, optionsSlugify)) ?? [];
      const albumData = await albumApiMethods.getInfo({ artist: artist.name, album: name });
      const artistSlug = slugify(artist.name, optionsSlugify);
      const body = albumData.album?.wiki?.content ?? "";
      return {
        name,
        nameSlug: slugify(name, optionsSlugify),
        artistReference: `src/content/artists/${artistSlug}.mdx`,
        artistSlug,
        artist: artist.name,
        release: new Date().toISOString(),
        genres,
        body,
      };
    })
  );

  return populatedInfo;
}

module.exports = {
  getTopAlbumsMatter,
};
