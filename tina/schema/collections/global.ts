import type { Collection, TinaField } from "tinacms";

import { i18n } from "../../../src/i18n";
import { replacePath } from "../../../src/lib/utils";

const collections = ["page"];

const collectionsField: Array<TinaField> = collections.map((collection) => ({
  type: "object",
  label: `Paths -> ${collection.charAt(0).toUpperCase() + collection.slice(1)}`,
  name: collection,
  list: true,
  ui: {
    itemProps: (values) => {
      const label =
        values &&
        Object.values(values)
          ?.map((value) => value && replacePath(value.href || ""))
          ?.join(" -> ");
      console.log(values);
      return {
        label,
      };
    },
  },
  fields: i18n.locales.map((locale) => ({
    type: "object",
    label: locale,
    name: locale,
    fields: [
      {
        type: "reference",
        label: "Link",
        name: "href",

        collections: [collection],
      },
      {
        type: "string",
        label: "Label",
        name: "label",
      },
    ],
  })),
}));

export const globalCollection: Collection = {
  label: "Global",
  name: "global",
  path: "src/content/global",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
    },
  },
  fields: [
    {
      type: "object",
      label: "Paths",
      name: "paths",

      fields: collectionsField,
    },
    {
      type: "object",
      label: "Social Links",
      name: "social",
      list: true,
      ui: {
        itemProps: ({ label }) => ({ label }),
      },
      fields: [
        {
          type: "string",
          label: "Link",
          name: "href",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
        },
      ],
    },
    {
      type: "object",
      label: "404",
      name: "notFound",
      fields: i18n.locales.map((locale) => ({
        type: "object",
        label: locale,
        name: locale,
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            label: "Link Label",
            name: "linkLabel",
          },
          {
            type: "string",
            label: "Link Href",
            name: "linkHref",
          },
        ],
      })),
    },
  ],
};
