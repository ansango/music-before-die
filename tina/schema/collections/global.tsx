import type { Collection } from "tinacms";

import { i18n } from "../../../src/i18n";
import { replacePath } from "../../../src/lib/utils";

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
      label: "Navigation",
      name: "navigation",
      fields: [
        {
          type: "object",
          label: "Main navigation",
          name: "main",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
              required: true,
            },
            {
              type: "string",
              label: "Label",
              name: "label",
              required: true,
            },
            {
              type: "boolean",
              label: "is Button?",
              name: "isButton",
            },
          ],
        },
        {
          type: "object",
          label: "Actions",
          name: "actions",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.label };
            },
            defaultItem: {
              href: "action",
              label: "action",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
              required: true,
            },
            {
              type: "string",
              label: "Label",
              name: "label",
              required: true,
            },
            {
              type: "boolean",
              label: "is Button?",
              name: "isButton",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Social Links",
      name: "social",
      fields: [
        {
          type: "string",
          label: "Facebook",
          name: "facebook",
        },
        {
          type: "string",
          label: "Twitter",
          name: "twitter",
        },
        {
          type: "string",
          label: "Instagram",
          name: "instagram",
        },
        {
          type: "string",
          label: "Github",
          name: "github",
        },
      ],
    },
    {
      type: "object",
      label: "Paths",
      name: "paths",
      fields: [
        {
          type: "string",
          label: "Wiki",
          name: "wiki",
        },
        {
          type: "string",
          label: "Blog",
          name: "blog",
        },
        {
          type: "string",
          label: "Contact",
          name: "contact",
        },
      ],
    },
    {
      type: "object",
      label: "Relations",
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
        label: locale,
        name: locale,
        collections: ["page"],
      })),
    },
  ],
};
