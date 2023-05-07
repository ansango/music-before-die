import type { Collection, TinaField } from "tinacms";

import { i18n } from "../../src/i18n";
import { labelField, linkField, visibleField, titleField, descriptionField } from "../fields";

const defaultNavItem = {
  href: "home",
  label: "Home",
  visible: false,
};

const dictionaryFields = (): Array<TinaField> => [
  {
    type: "object",
    label: "Navigation",
    name: "navigation",
    list: true,
    ui: {
      itemProps: ({ label }) => ({ label }),
      defaultItem: defaultNavItem,
    },

    fields: [
      visibleField({ required: true }),
      linkField({ required: false }),
      labelField({ required: true }),
    ],
  },
  {
    type: "object",
    label: "Social Links",
    name: "social",
    list: true,
    ui: {
      itemProps: ({ label }) => ({ label }),
      defaultItem: defaultNavItem,
    },

    fields: [
      visibleField({ required: true }),
      linkField({ required: true }),
      labelField({ required: true }),
    ],
  },
  {
    type: "object",
    label: "Not Found",
    name: "notFound",
    fields: [
      visibleField({ required: true }),
      titleField({ required: true }),
      descriptionField(),
      linkField({ required: false }),
      labelField({ required: false }),
    ],
  },
];

const fieldsByLocale = (): Array<TinaField> =>
  i18n.locales.map((locale) => ({
    type: "object",
    label: locale,
    name: locale,
    fields: [...dictionaryFields()],
  }));

const globalCollection: Collection = {
  label: "global",
  name: "global",
  path: `src/content/global`,
  ui: {
    global: true,
  },
  format: "json",
  fields: [...fieldsByLocale()],
};

export const globalModule = (): Array<Collection> => [globalCollection];
