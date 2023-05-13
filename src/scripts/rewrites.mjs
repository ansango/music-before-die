import path from "path";

import { generateJsonFile, getDataFromMarkdownFile, getFilesFromFolder } from "./common.mjs";

function getPagesFromFiles(files) {
  const pages = [];
  for (const file of files) {
    const {
      locale,
      segments: _segments,
      collection,
      filename_id: filename,
    } = getDataFromMarkdownFile(file);
    const segments = _segments
      .filter(({ value }) => value !== "/")
      .map(({ value }) => value)
      .join("");

    const source = `/${locale}${segments}`;
    const destination = `/${locale}/${collection}/${filename}`;

    pages.push({
      source,
      destination,
    });
  }
  return pages;
}

const RECURSIVE_PAGE_PATHS = path.join(process.cwd(), "src/content");

const files = getFilesFromFolder(RECURSIVE_PAGE_PATHS);
const pages = getPagesFromFiles(files);

generateJsonFile(pages, "src/config/rewrites.json");
