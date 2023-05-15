import slugify from "slugify";
import type { Collection } from "tinacms";

import { bodySimpleTemplate, heroBaseTemplate } from "../blocks";
import { seo } from "../objects";

export const pagesCollection: Collection = {
  label: "Pages",
  name: "pages",
  path: "src/content/pages",
  format: "mdx",
  ui: {
    filename: {
      slugify: ({ filename_id }) => (filename_id && slugify(filename_id, { lower: true })) || "",
    },
  },
  fields: [
    seo,
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocks",
      ui: {
        visualSelector: true,
      },
      templates: [heroBaseTemplate, bodySimpleTemplate],
    },
  ],
};
