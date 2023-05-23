import fs from "fs";

import matter from "gray-matter";
import yaml from "js-yaml";
import { lastFmClient } from "lastfm-client-ts";
import slugify from "slugify";

import { getLocalAlbums, getLocalArtists } from "../common.mjs";

import { optionsSlugify } from "./config.mjs";

const { albumApiMethods } = lastFmClient();

function getAlbumsData() {
  return getLocalAlbums().map((route) => matter.read(route).data);
}

function getArtistsData() {
  return getLocalArtists().map((route) => matter.read(route).data);
}

async function gettingTracks() {
  const albumsData = getAlbumsData();
  const artistsData = getArtistsData();

  const albumsPopulatedWithArtists = albumsData.map((album) => {
    const artist = artistsData.find((artist) => {
      return (
        slugify(artist.name, optionsSlugify) ===
        album.artist.replaceAll("src/content/artists/", "").replaceAll(".mdx", "")
      );
    });

    return {
      album: album.name,
      artist: artist.name,
    };
  });
  return await Promise.all(
    albumsPopulatedWithArtists.map(async ({ album, artist }) => {
      const {
        album: {
          tracks: { track: tracks },
        },
      } = await albumApiMethods.getInfo({ album, artist });

      return {
        artist,
        album,
        tracks: tracks.map(({ name, duration, "@attr": { rank } }) => {
          return { name, duration, rank };
        }),
      };
    })
  );
}

function parseDuration(duration) {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  return mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0");
}

async function addTracks() {
  const results = await gettingTracks();
  const routesAlbums = getLocalAlbums();

  routesAlbums.forEach((route) => {
    const { data, content } = matter.read(route);
    const { name } = data;
    const albumMatterSlugged = slugify(name, optionsSlugify);

    const tracklist = results
      .map(({ album, tracks }) => {
        const albumSlugged = slugify(album, optionsSlugify);
        const mappedTracks = tracks.map(({ name, duration, rank }) => ({
          name,
          duration: duration ? `${parseDuration(duration)}` : "",
          rank,
        }));
        return albumSlugged === albumMatterSlugged ? mappedTracks : null;
      })
      .filter((result) => result !== null)[0];

    const doc = yaml.dump({ ...data, tracklist });
    const newContent = `---\n${doc}---\n\n${content}\n`;
    fs.writeFileSync(route, newContent);
  });
}

addTracks();
