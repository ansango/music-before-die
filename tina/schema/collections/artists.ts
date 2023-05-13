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
    type: "reference",
    label: "Albums",
    name: "albums",
    collections: ["album"],
    description: "Albums of the artist",
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
  name: "artist",
  path: "src/content/artist",
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
