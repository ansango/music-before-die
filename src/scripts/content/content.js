/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const yaml = require("js-yaml");
const { default: slugify } = require("slugify");

const { createFolder } = require("../common");

const { getTopAlbumsMatter } = require("./albums");
const { getTopArtistMatter } = require("./artists");
const { optionsSlugify } = require("./config");

async function writeArtistsFile(outputPath, data) {
  const outputDirPath = path.resolve(outputPath);

  if (fs.existsSync(outputDirPath)) {
    fs.rmSync(outputDirPath, { recursive: true });
  }
  createFolder(outputPath, { recursive: true });

  for (const fileData of data) {
    const { name, artist, body, genres } = fileData;
    const albums = fileData.albums.map((album) => slugify(album, optionsSlugify));
    const doc = yaml.dump({
      name,
      albums: albums.map((album) => {
        return {
          album: `src/content/albums/${artist}/${album}.mdx`,
        };
      }),
      genres,
    });

    const content = `---
${doc}
---

 ${body}
 `;

    fs.writeFileSync(`${outputPath}/${artist}.mdx`, content);
  }
  console.log(`Done writing ${data.length} markdown files to ${outputPath}`);
}

async function prepareArtists(dataAlbums, outputPath) {
  const artistsNames = dataAlbums.map(({ artist }) => artist);
  const artistsNamesUnique = Array.from(new Set(artistsNames));
  const dataArtists = await getTopArtistMatter(artistsNamesUnique);
  const artistsPopulated = dataArtists.map((artist) => {
    const albums = dataAlbums
      .filter(({ artist: art }) => art === artist.name)
      .map(({ name }) => name);

    return {
      ...artist,
      albums,
    };
  });

  writeArtistsFile(outputPath, artistsPopulated);
}

async function writeAlbumsFile(outputPath) {
  const outputPathArtists = process.cwd() + "/.content/artists";
  const data = await getTopAlbumsMatter();
  await prepareArtists(data, outputPathArtists);
  const outputDirPath = path.resolve(outputPath);

  if (fs.existsSync(outputDirPath)) {
    fs.rmSync(outputDirPath, { recursive: true });
  }
  createFolder(outputPath, { recursive: true });
  const tags = [];
  for (const fileData of data) {
    const { name, nameSlug, artistSlug, artistReference, release, genres, body } = fileData;
    const doc = yaml.dump({
      name,
      artist: artistReference,
      release,
      genres,
    });
    tags.push(...genres);
    const artistFolder = `${outputPath}/${artistSlug}`;
    createFolder(artistFolder, { recursive: true });

    const content = `---
${doc}
---

 ${body}
 `;

    fs.writeFileSync(`${artistFolder}/${nameSlug}.mdx`, content);
  }

  const genres = Array.from(new Set(tags)).sort();
  const outputTags = process.cwd() + "/.content";
  fs.writeFileSync(`${outputTags}/tags.json`, JSON.stringify(genres, null, 2));
  console.log(`Done writing ${data.length} markdown files to ${outputPath}`);
}

const outputPathAlbums = process.cwd() + "/.content/albums";
writeAlbumsFile(outputPathAlbums);
