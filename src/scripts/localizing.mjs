import { getPages } from "./lib/index.mjs";

async function generateLocalization() {
  const pages = await getPages();
  console.log(pages);
}

generateLocalization();
