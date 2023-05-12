import slugify from "slugify";
import type { Collection } from "tinacms";

import { i18n } from "../../../src/i18n";
import { bodySimpleTemplate, heroBaseTemplate } from "../blocks";
import { seo } from "../objects";

export const pagesCollection: Collection = {
  label: "Pages",
  name: "page",
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
    {
      type: "string",
      label: "ID",
      name: "filename_id",
      required: true,
      description:
        "Unique identifier for the filename equal in i18n versions: about => about.es.mdx, about.en.mdx",
    },
    {
      type: "string",
      label: "Segment",
      name: "segment",
      required: true,
      description: "Segment of the url: /about, /sobre-nosotros",
    },
    {
      type: "string",
      label: "Lang",
      name: "locale",
      options: i18n.locales.map((locale) => locale),
      required: true,
      description: "Language of the page",
      ui: {
        component: "radio-group",
      },
    },
    seo,
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [heroBaseTemplate, bodySimpleTemplate],
    },
  ],
};
