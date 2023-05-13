import path from "path";

import { generateJsonFile, getDataFromMarkdownFile, getFilesFromFolder } from "./common.mjs";

function getPagesFromFiles(files) {
  const pages = [];
  for (const file of files) {
    const data = getDataFromMarkdownFile(file);

    const source = `/${data.locale}${data.segment === "/" ? "" : data.segment}`;
    const destination = `/${data.locale}/${data.collection}/${data.filename_id}`;

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
