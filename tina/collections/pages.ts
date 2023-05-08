import type { Collection, TinaField } from "tinacms";

import { i18n } from "../../src/i18n";
import { kebabCase } from "../../src/lib";
import { descriptionField, titleField, visibleField } from "../fields";
import { bodySimpleTemplate, heroBaseTemplate } from "../templates";

const pageBlocksField = (): TinaField => ({
  type: "object",
  list: true,
  name: "blocks",
  label: "Blocks",
  ui: {
    visualSelector: true,
  },
  templates: [heroBaseTemplate, bodySimpleTemplate],
});

const pagesCollections = (): Array<Collection> =>
  i18n.locales.map((locale) => ({
    label: `pages /${locale}`,
    name: `${locale}_page`,
    path: `src/content/pages/${locale}`,
    format: "mdx",
    ui: {
      filename: {
        readonly: true,
        slugify: ({ title }) => title && kebabCase(title),
      },
    },
    fields: [
      visibleField({ required: true }),
      titleField({ required: true }),
      descriptionField(),
      pageBlocksField(),
    ],
  }));

export const pagesModule = (): Array<Collection> => [...pagesCollections()];
