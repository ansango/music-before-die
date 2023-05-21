/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const createFolder = (folderName, options) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, options);
  }
};

const extensions = [".mdx"];

function getFilesFromFolder(folderPath) {
  let files = [];
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      files = files.concat(getFilesFromFolder(filePath));
    } else if (extensions.includes(path.extname(filePath).toLowerCase())) {
      files.push(filePath);
    }
  });
  return files;
}

const getLocalAlbums = () => {
  const folderPath = process.cwd() + "/src/content/albums";
  const files = getFilesFromFolder(folderPath);
  return files.map((file) => file.replace(folderPath, "src/content/albums"));
};

const getLocalArtists = () => {
  const folderPath = process.cwd() + "/src/content/artists";
  const files = getFilesFromFolder(folderPath);
  return files.map((file) => file.replace(folderPath, "src/content/artists"));
};

module.exports = {
  createFolder,
  getLocalAlbums,
  getLocalArtists,
};
