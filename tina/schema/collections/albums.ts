import slugify from "slugify";
import type { Collection, TinaField } from "tinacms";

import { genresField, seo } from "../objects";

const albumFields: Array<TinaField> = [
  {
    type: "string",
    label: "Name",
    name: "name",
    required: true,
    description: "Name of the album",
  },
  {
    type: "reference",
    collections: ["artists"],
    label: "Artist",
    name: "artist",
    required: true,
  },
  {
    type: "datetime",
    label: "Release Year",
    name: "release",
    required: true,
    description: "Date of release",
    ui: {
      dateFormat: "yyyy",
    },
  },
  {
    type: "image",
    label: "Artwork",
    name: "artwork",
    description: "Album artwork",
  },
  genresField,
  {
    type: "rich-text",
    label: "Body",
    name: "body",
    isBody: true,
  },
];

export const albumsCollection: Collection = {
  label: "Albums",
  name: "albums",
  path: "src/content/albums",
  format: "mdx",
  ui: {
    filename: {
      slugify: ({ filename_id, locale }) => {
        const slug = filename_id && slugify(filename_id, { lower: true });
        return locale ? `${slug}.${locale}` : slug;
      },
    },
  },
  fields: [seo, ...albumFields],
};
