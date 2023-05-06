import type { Collection, TinaField } from "tinacms";

import { i18n } from "../../src/i18n-config";
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
      titleField({ required: true, isTitle: true }),
      descriptionField(),
      pageBlocksField(),
    ],
  }));

const pagesCollectionsField = i18n.locales.map((locale) => `${locale}_page`);

const createLabel = ({ source, destination }: { source: string; destination: string }) =>
  `${source} -> ${destination}`.replaceAll(".mdx", "").replaceAll("src/content/pages/", "");

const pageRewritesCollection = (): Array<Collection> => [
  {
    label: "pages /rewrites",
    name: "rewrite_page",
    path: "src/content/pages",
    format: "json",
    fields: [
      {
        type: "object",
        label: "Rewrites",
        name: "rewrites",
        list: true,
        ui: {
          itemProps: ({ source, destination }) => {
            const label = createLabel({ source, destination });
            return { label };
          },
        },

        fields: [
          {
            type: "reference",
            name: "source",
            label: "Source",
            required: true,
            collections: pagesCollectionsField,
          },
          {
            type: "reference",
            name: "destination",
            label: "Destination",
            required: true,
            collections: pagesCollectionsField,
          },
        ],
      },
    ],
  },
];

export const pagesModule = (): Array<Collection> => [
  ...pagesCollections(),
  ...pageRewritesCollection(),
];
