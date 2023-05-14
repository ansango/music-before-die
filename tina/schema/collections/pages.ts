import slugify from "slugify";
import type { Collection } from "tinacms";

import { bodySimpleTemplate, heroBaseTemplate } from "../blocks";
import { pageWithSeo } from "../objects";

export const pagesCollection: Collection = {
  label: "Pages",
  name: "pages",
  path: "src/content/pages",
  format: "mdx",
  ui: {
    filename: {
      slugify: ({ filename_id, locale }) => {
        const slug = filename_id && slugify(filename_id, { lower: true });
        return locale ? `${slug}.${locale}` : slug;
      },
    },
  },
  fields: [
    ...pageWithSeo,
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
