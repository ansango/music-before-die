import type { Collection } from "tinacms";

import { i18n } from "../../../src/i18n";
import { links } from "../objects";

type Section = "pages" | "artists" | "albums" | "playlists";
const sections: Array<Section> = ["pages", "artists", "albums", "playlists"];

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
      label: "Sitemap",
      name: "sitemap",
      description: "The sitemap is used to generate the navigation.",
      ui: {
        itemProps: ({ label }) => ({ label }),
      },
      fields: i18n.locales.map((locale) => ({
        type: "object",
        label: locale,
        name: locale,
        description: `The sitemap is used to generate the navigation for ${locale}.`,
        fields: [
          {
            type: "object",
            label: "Sections",
            name: "sections",
            description:
              "The sections are used to generate the primary navigation, usually the main pages.",
            list: true,
            ui: {
              itemProps: ({ label }) => ({ label: `${locale}/${label ?? "item"}`.toLowerCase() }),
            },
            fields: [
              {
                type: "string",
                label: "Label",
                name: "label",
              },

              {
                type: "reference",
                label: "Link",
                name: "link",
                description: `Be sure to reference '${locale}' locale page.`,
                collections: [...sections.filter((section) => section === "pages")],
              },
              {
                type: "object",
                label: "Sections",
                name: "sections",
                description: `Usually the sub pages as ${[
                  ...sections.filter((section) => section !== "pages"),
                ].join(", ")}.`,
                list: true,
                ui: {
                  itemProps: ({ label }) => ({
                    label: `${label ?? "item"}`.toLowerCase(),
                  }),
                },
                fields: [
                  {
                    type: "string",
                    label: "Label",
                    name: "label",
                  },

                  {
                    type: "reference",
                    label: "Link",
                    name: "link",
                    collections: [...sections.filter((section) => section !== "pages")],
                  },
                ],
              },
            ],
          },
        ],
      })),
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
  ],
};
