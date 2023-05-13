import path from "path";

import { generateJsonFile, getDataFromMarkdownFile, getFilesFromFolder } from "./common.mjs";

function getPagesFromFiles(files) {
  return files
    .map((file) => getDataFromMarkdownFile(file))
    .map(({ locale, segments: _segments, collection: _collection, filename_id: filename }) => {
      const segments = _segments
        .filter(({ value }) => value !== "/")
        .map(({ value }) => value)
        .join("");

      const collection = _collection === "page" ? "" : `${_collection}/`;

      console.log({
        source: `/${locale}${segments}`,
        destination: `/${locale}/${collection}${filename}`,
      });
      return {
        source: `/${locale}${segments}`,
        destination: `/${locale}/${collection}${filename}`,
      };
    });
}

const RECURSIVE_PAGE_PATHS = path.join(process.cwd(), "src/content");

const files = getFilesFromFolder(RECURSIVE_PAGE_PATHS);
const pages = getPagesFromFiles(files);

generateJsonFile(pages, "src/config/rewrites.json");
