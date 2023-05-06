import fs from "fs";
import path from "path";

import matter from "gray-matter";

export const createFolder = (folderName, options) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, options);
  }
};

export const route = (nameFolder) => path.join(process.cwd(), nameFolder);

const fileExtensions = [".mdx"];

function getFilesFromFolder(folderPath) {
  let files = [];
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      files = files.concat(getFilesFromFolder(filePath));
    } else if (fileExtensions.includes(path.extname(filePath).toLowerCase())) {
      files.push(filePath);
    }
  });
  return files;
}

export const getPages = () => {
  const PAGES_DIR = route("src/content/pages");
  const files = getFilesFromFolder(PAGES_DIR);
  const pages = files.map((file) => {
    const source = fs.readFileSync(file);
    const { data } = matter(source);
    return { ...data, filename: file.replace(PAGES_DIR, "").replace(".mdx", "") };
  });
  console.log(PAGES_DIR);
  // const pages = fs.readdirSync(PAGES_DIR).map((file) => {
  //   const source = fs.readFileSync(path.join(PAGES_DIR, file));
  //   const filename = file.replace(".mdx", "");
  //   const { data } = matter(source);

  //   if (data?.visible === false) return null;
  //   if (!data?.blocks) return null;

  //   const replaced = filename.replaceAll("-", " ");
  //   const title = replaced.charAt(0).toUpperCase() + replaced.slice(1);
  //   return {
  //     title,
  //     filename,
  //   };
  // });

  return {
    // pages: pages.filter((item) => item !== null),
    pages: pages.filter((item) => item.visible),
  };
};
