import path from "path";

import { generateJsonFile, getDataFromMarkdownFile, getFilesFromFolder } from "./common.mjs";

function getPagesFromFiles(files) {
  const rewrites = files.map((file) => getDataFromMarkdownFile(file).rewrites);
  // removing duplicates
  return rewrites.filter((rewrite, index, self) => {
    return (
      index ===
      self.findIndex((t) => t.source === rewrite.source && t.destination === rewrite.destination)
    );
  });
}

const RECURSIVE_PAGE_PATHS = path.join(process.cwd(), "src/content");

const files = getFilesFromFolder(RECURSIVE_PAGE_PATHS);
const pages = getPagesFromFiles(files);

console.table(pages);

generateJsonFile(pages, "src/config/rewrites.json");
