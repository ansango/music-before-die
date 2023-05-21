import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

import sharp from "sharp";
import slugify from "slugify";

import { optionsSlugify } from "./content/config.mjs";
import { genres as globalGenres } from "./genres.js";

export const createFolder = (folderName, options) => {
  if (!existsSync(folderName)) {
    mkdirSync(folderName, options);
  }
};

const extensions = [".mdx", ".jpg", ".jpeg", ".png", ".gif"];

export function getFilesFromFolder(folderPath) {
  let files = [];
  readdirSync(folderPath).forEach((file) => {
    const filePath = join(folderPath, file);
    const fileStat = statSync(filePath);
    if (fileStat.isDirectory()) {
      files = files.concat(getFilesFromFolder(filePath));
    } else if (extensions.includes(extname(filePath).toLowerCase())) {
      files.push(filePath);
    }
  });
  return files;
}

export const getLocalAlbums = () => {
  const folderPath = process.cwd() + "/src/content/albums";
  const files = getFilesFromFolder(folderPath);
  return files.map((file) => file.replace(folderPath, "src/content/albums"));
};

export const getLocalArtists = () => {
  const folderPath = process.cwd() + "/src/content/artists";
  const files = getFilesFromFolder(folderPath);
  return files.map((file) => file.replace(folderPath, "src/content/artists"));
};

export const getBase64FromUrl = async (url) => {
  const minified = await sharp(url).resize(8).webp({ quality: 50 }).toBuffer();
  const image = `data:image/webp;base64,${Buffer.from(minified).toString("base64")}`;
  return image;
};

export const getGenres = () => globalGenres.map((genre) => slugify(genre, optionsSlugify));

export const parseGenres = (genres) => {
  const genresLocal = getGenres();
  const raw = genres.filter(({ name }) => {
    const genre = slugify(name, optionsSlugify);
    return genresLocal.includes(genre);
  });
  return Array.from(new Set(raw.map(({ name }) => slugify(name, optionsSlugify)))) ?? [];
};
