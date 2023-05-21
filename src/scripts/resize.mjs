import fs from "fs";
import path from "path";

import sharp from "sharp";

import { createFolder, getBase64FromUrl, getFilesFromFolder } from "./common.mjs";

const input = "/public/images";
const output = "/public/images/resized";
const blur = "/src/constants/blur";

const inputPath = process.cwd() + input;
const outputPath = process.cwd() + output;
const outputBlurPath = process.cwd() + blur;

async function resize(
  inputPath,
  outputPath,
  outputBlurPath,
  format = "webp",
  quality = 85,
  mode = "square"
) {
  console.log("Starting image resizing");
  console.log("Input path:", inputPath);
  createFolder(inputPath);
  console.log("Output path:", outputPath);
  const outputDirPath = path.resolve(outputPath);
  console.log("Blur path:", outputBlurPath);
  const outputBlurDirPath = path.resolve(outputBlurPath);

  if (fs.existsSync(outputDirPath)) {
    fs.rmSync(outputDirPath, { recursive: true });
  }

  if (fs.existsSync(outputBlurDirPath)) {
    fs.rmSync(outputBlurDirPath, { recursive: true });
  }
  console.log("Creating output folders");
  console.log("Output path:", outputPath);
  createFolder(outputPath, { recursive: true });
  console.log("Blur path:", outputBlurPath);
  createFolder(outputBlurPath, { recursive: true });
  console.log("Resizing images");
  const images = getFilesFromFolder(inputPath);
  console.log("Found", images.length, "images");
  let jsonblur = [];
  for (const imagePath of images) {
    console.log("Resizing", imagePath);
    const subFolderPath = path.dirname(path.relative(inputPath, imagePath));
    const outputFolder = path.join(outputPath, subFolderPath);
    const outputBlurFolder = path.join(outputBlurPath);

    fs.mkdirSync(outputFolder, { recursive: true });
    fs.mkdirSync(outputBlurFolder, { recursive: true });

    const image = sharp(imagePath);
    const outputExt = format === "webp" ? ".webp" : ".jpg";
    const metadata = await image.metadata();
    const { width, height } = metadata;
    const isLandscape = width > height;
    const isPortrait = width < height;

    if (mode === "landscape" && isLandscape) {
      await image
        .webp({ quality, effort: 6 })
        .resize({ width: 720, height: 480, fit: "cover" })
        .toFile(
          path.join(outputFolder, path.basename(imagePath, path.extname(imagePath)) + outputExt)
        );
    } else if (mode === "portrait" && isPortrait) {
      await image
        .webp({ quality, effort: 6 })
        .resize({ width: 480, height: 720, fit: "cover" })
        .toFile(
          path.join(outputFolder, path.basename(imagePath, path.extname(imagePath)) + outputExt)
        );
    } else {
      await image
        .webp({ quality, effort: 6 })
        .resize({ width: 720, height: 720, fit: "cover" })
        .toFile(
          path.join(outputFolder, path.basename(imagePath, path.extname(imagePath)) + outputExt)
        );
    }

    console.log("Resized", imagePath);
    const base64 = await getBase64FromUrl(imagePath);

    jsonblur.push(
      JSON.stringify({
        url: `${output}/${path.basename(imagePath, path.extname(imagePath)) + outputExt}`,
        img: base64,
      })
    );
    console.log("Generated blur image", imagePath);
  }

  fs.writeFileSync(
    path.join(outputBlurPath, "data.js"),
    `const data = [${jsonblur.join(",")}]; export default data;`
  );

  console.log("Finished image resizing");
  console.log("Output path:", outputPath);
  console.log("Blur path:", outputBlurPath);
  console.log("Total images:", images.length);
}

resize(inputPath, outputPath, outputBlurPath, "webp", 80, "square");
