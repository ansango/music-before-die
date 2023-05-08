import type { Collection } from "tinacms";

import type { Locale } from "../../src/i18n";
import { i18n } from "../../src/i18n";
import { replacePath } from "../../src/lib";

const pagesCollectionsField = i18n.locales.map((locale) => `${locale}_page`);

const collectionsField = (locale: Locale): Array<string> => [
  ...pagesCollectionsField.filter((name) => name === `${locale}_page`),
];

const relations = (): Array<Collection> => [
  {
    label: "relations",
    name: "relations",
    path: "src/content",
    format: "json",
    fields: [
      {
        type: "object",
        label: "Pages Relations",
        name: "relations",
        list: true,
        ui: {
          itemProps: (values) => ({
            label: Object.values(values)
              .map((value) => replacePath(value))
              .join(" -> "),
          }),
        },

        fields: i18n.locales.map((locale) => ({
          type: "reference",
          label: `/${locale}`,
          name: locale,
          collections: collectionsField(locale),
        })),
      },
    ],
  },
];

export const relationsModule = (): Array<Collection> => [...relations()];
