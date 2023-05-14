import fs from "fs";
import path from "path";

import matter from "gray-matter";

export function generateJsonFile(pages, path) {
  const json = JSON.stringify(pages, null, 2);
  fs.writeFile(path, json, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

export const makeWriteObject = (locale, segments, collection, filename_id) => {
  if (collection === "pages") {
    return {
      source: `/${locale}${segments.map(({ value }) => value).join("")}`.replace(/\/(?!.*\w)/, ""),
      destination: `/${locale}/${filename_id}`.replace(/\/(?!.*\w)/, ""),
    };
  }
  return {
    source: `/${locale}${segments.map(({ value }) => value)?.[0]}/:slug`,
    destination: `/${locale}/${collection}/:slug`,
  };
};

export function getDataFromMarkdownFile(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  const collection = path.basename(path.dirname(filePath));
  return {
    ...data,
    collection,
    filePath,
    rewrites: makeWriteObject(data.locale, data.segments, collection, data.filename_id),
  };
}

const filesExtensions = [".md", ".mdx"];

export function getFilesFromFolder(folderPath) {
  let paths = [];
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      paths = paths.concat(getFilesFromFolder(filePath));
    } else if (filesExtensions.includes(path.extname(filePath).toLowerCase())) {
      paths.push(filePath);
    }
  });
  return paths;
}
