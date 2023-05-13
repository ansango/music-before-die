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

export function getDataFromMarkdownFile(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  const collection = path.basename(path.dirname(filePath));
  return { ...data, collection, filePath };
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
