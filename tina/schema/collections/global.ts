import type { Collection } from "tinacms";

import { i18n } from "../../../src/i18n";

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
    // TODO: Add a field for the main navigation etc.
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
