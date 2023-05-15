import type { Collection } from "tinacms";

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
      fields: [
        {
          type: "object",
          label: "Sections",
          name: "sections",
          description:
            "The sections are used to generate the primary navigation, usually the main pages.",
          list: true,
          ui: {
            itemProps: ({ label }) => ({ label: `/${label ?? "item"}`.toLowerCase() }),
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
    },

    {
      type: "object",
      label: "404",
      name: "notFound",
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
