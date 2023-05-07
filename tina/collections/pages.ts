import type { Collection, TinaField } from "tinacms";

import { i18n } from "../../src/i18n";
import { kebabCase, replacePagePath } from "../../src/lib";
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

const pagesCollectionsField = i18n.locales.map((locale) => `${locale}_page`);

const pagesRelations = (): Array<Collection> => [
  {
    label: "pages /relations",
    name: "page_relations",
    path: "src/content/pages",
    format: "json",
    fields: [
      {
        type: "object",
        label: "Pages Relations",
        name: "page_relations",
        list: true,
        ui: {
          itemProps: (values) => {
            const _values = Object.values(values).map((value) => {
              return replacePagePath(value);
            });

            return { label: _values.join(" -> ") };
          },
        },

        fields: i18n.locales.map((locale) => ({
          type: "reference",
          label: `/${locale}`,
          name: locale,
          collections: pagesCollectionsField.filter((name) => name === `${locale}_page`),
        })),
      },
    ],
  },
];

export const pagesModule = (): Array<Collection> => [...pagesCollections(), ...pagesRelations()];
