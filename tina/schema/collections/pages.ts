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
      readonly: true,
      slugify: ({ title, locale }) => {
        const slug = title && slugify(title, { lower: true });
        return locale ? `${locale}/${slug}` : slug;
      },
    },
  },
  fields: [
    seo,
    {
      type: "string",
      label: "lang",
      name: "locale",
      options: i18n.locales.map((locale) => locale),
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [bodySimpleTemplate, heroBaseTemplate],
    },
  ],
};
