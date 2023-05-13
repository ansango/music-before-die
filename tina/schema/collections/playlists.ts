import slugify from "slugify";
import type { Collection } from "tinacms";

import { pageWithSeo } from "../objects";

export const playlistsCollection: Collection = {
  label: "Playlists",
  name: "playlist",
  path: "src/content/playlists",
  format: "mdx",
  ui: {
    filename: {
      slugify: ({ filename_id, locale }) => {
        const slug = filename_id && slugify(filename_id, { lower: true });
        return locale ? `${slug}.${locale}` : slug;
      },
    },
  },
  fields: [...pageWithSeo],
};
