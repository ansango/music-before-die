import fs from "fs";
import path from "path";

import yaml from "js-yaml";
import slugify from "slugify";

import { createFolder } from "../common.mjs";

import { getTopAlbumsMatter } from "./albums.mjs";
import { getArtistMatter } from "./artists.mjs";
import { optionsSlugify } from "./config.mjs";

async function writeArtistsFile(outputPath, data) {
  const outputDirPath = path.resolve(outputPath);

  if (fs.existsSync(outputDirPath)) {
    fs.rmSync(outputDirPath, { recursive: true });
  }
  createFolder(outputPath, { recursive: true });

  for (const fileData of data) {
    const { name, artist, genres } = fileData;
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

# ${name}

 `;

    fs.writeFileSync(`${outputPath}/${artist}.mdx`, content);
  }
  console.log(`Done writing ${data.length} markdown files to ${outputPath}`);
}

async function prepareArtists(dataAlbums, outputPath) {
  const artistsNames = dataAlbums.map(({ artist }) => artist);
  const artistsNamesUnique = Array.from(new Set(artistsNames));
  const dataArtists = await getArtistMatter(artistsNamesUnique);
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
    const { name, nameSlug, artistSlug, artistReference, release, genres } = fileData;
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

# ${name}
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
