import fs from "fs";
import path from "path";

import matter from "gray-matter";

const PAGES_PATH = path.join(process.cwd(), "src/content/pages");

function getDataFromMarkdownFile(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return data;
}

function getPages() {
  const pages = [];
  const pagePaths = fs.readdirSync(PAGES_PATH);
  for (const pagePath of pagePaths) {
    const data = getDataFromMarkdownFile(`${PAGES_PATH}/${pagePath}`);
    const source = `/${data.locale}${data.segment === "/" ? "" : data.segment}`;
    const destination = `/${data.locale}/${data.filename_id}`;
    pages.push({
      source,
      destination,
    });
  }
  return pages;
}

function generateJsonFile(pages, path) {
  const json = JSON.stringify(pages, null, 2);
  fs.writeFile(path, json, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

const pages = getPages();

generateJsonFile(pages, "rewrites.json");
