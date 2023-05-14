import slugify from "slugify";
import type { Collection, TinaField } from "tinacms";

import { links, pageWithSeo } from "../objects";

const artistFields: Array<TinaField> = [
  {
    type: "string",
    label: "Name",
    name: "name",
    required: true,
    description: "Name of the artist",
  },
  {
    type: "string",
    label: "Image",
    name: "image",
    description: "Image of the artist",
  },
  {
    type: "object",
    label: "Albums",
    name: "albums",
    description: "Albums of the artist",
    list: true,
    fields: [
      {
        type: "reference",
        label: "Album",
        name: "album",
        collections: ["albums"],
        required: true,
      },
    ],
  },

  links({ name: "musicLinks", label: "Music Links" }),
  {
    type: "rich-text",
    label: "Body",
    name: "body",
    isBody: true,
  },
];

export const artistsCollection: Collection = {
  label: "Artists",
  name: "artists",
  path: "src/content/artists",
  format: "mdx",
  ui: {
    filename: {
      slugify: ({ filename_id, locale }) => {
        const slug = filename_id && slugify(filename_id, { lower: true });
        return locale ? `${slug}.${locale}` : slug;
      },
    },
  },
  fields: [...pageWithSeo, ...artistFields],
};
