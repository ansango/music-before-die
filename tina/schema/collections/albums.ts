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
    type: "object",
    label: "Tracklist",
    name: "tracklist",
    list: true,
    ui: {
      itemProps: (item) => ({
        label: `${item.rank}. ${item.name} - ${item.duration}`,
      }),
    },
    fields: [
      {
        type: "string",
        label: "Name",
        name: "name",
        required: true,
      },
      {
        type: "string",
        label: "Duration",
        name: "duration",
        required: true,
      },
      {
        type: "number",
        label: "Rank",
        name: "rank",
      },
    ],
  },
  {
    type: "rich-text",
    label: "Body",
    name: "body",
    isBody: true,
  },

  {
    label: "Rating",
    name: "rating",
    type: "number",
    description: "Rating of the album",
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
