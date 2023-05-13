import path from "path";

import { generateJsonFile, getDataFromMarkdownFile, getFilesFromFolder } from "./common.mjs";

function getPagesFromFiles(_files) {
  const segmentsByLocale = [
    ...new Set(
      _files.map((file) => {
        return {
          locale: getDataFromMarkdownFile(file).locale,
          segments: getDataFromMarkdownFile(file).segments.map(({ value }) => value),
          collection: getDataFromMarkdownFile(file).collection,
        };
      })
    ),
  ];

  const data = segmentsByLocale.map(({ locale, segments, collection }) => {
    const collectionSegment = segments[0];
    const isIndexPage = segments.length === 1 && collectionSegment === "/";
    const source = `/${locale}/${collection}/:slug`;
    const destination = `/${locale}${
      isIndexPage ? collectionSegment.replace("/", "") : collectionSegment
    }/:slug`;

    if (source !== destination) {
      return {
        source,
        destination,
        permanent: false,
      };
    }
    return;
  });

  return data.filter(Boolean);
}

const RECURSIVE_PAGE_PATHS = path.join(process.cwd(), "src/content");

const files = getFilesFromFolder(RECURSIVE_PAGE_PATHS);
const pages = getPagesFromFiles(files);

generateJsonFile(pages, "src/config/redirects.json");
