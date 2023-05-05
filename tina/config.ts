import { defineConfig } from "tinacms";

import { heroBaseTemplate, bodySimpleTemplate } from "./templates";
import { kebabCase } from "../src/lib";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

type Lang = "EN" | "ES";

const langTypes: Record<Lang, string> = {
  ES: "es",
  EN: "en",
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  token: process.env.TINA_TOKEN || "dummy",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        label: "Pages",
        name: "page",
        path: "src/content/pages",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: ({ title, lang }) => {
              return title && `${langTypes[lang as Lang]}/${kebabCase(title)}`;
            },
          },
        },
        fields: [
          {
            name: "visible",
            label: "Visible",
            type: "boolean",
          },
          {
            name: "lang",
            label: "Language",
            type: "string",

            options: ["EN", "ES"],
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "description",
            type: "string",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Blocks",
            ui: {
              visualSelector: true,
            },
            templates: [heroBaseTemplate, bodySimpleTemplate],
          },
        ],
      },
      {
        label: "Layout",
        name: "global",
        path: "src/content/global",
        format: "json",
        fields: [
          {
            type: "object",
            label: "Navigation",
            name: "navigation",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label };
              },
              defaultItem: {
                href: "home",
                label: "Home",
                visible: false,
              },
            },

            fields: [
              {
                type: "boolean",
                label: "Visible",
                name: "visible",
              },
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
            label: "Social Links",
            name: "social",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label };
              },
              defaultItem: {
                href: "home",
                label: "Home",
                visible: false,
              },
            },

            fields: [
              {
                type: "boolean",
                label: "Visible",
                name: "visible",
              },
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
      },
    ],
  },
});
