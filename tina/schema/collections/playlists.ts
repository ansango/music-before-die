import slugify from "slugify";
import type { Collection } from "tinacms";

import { seo } from "../objects";

export const playlistsCollection: Collection = {
  label: "Playlists",
  name: "playlists",
  path: "src/content/playlists",
  format: "mdx",
  ui: {
    filename: {
      slugify: ({ filename_id }) => filename_id && slugify(filename_id, { lower: true }),
    },
  },
  fields: [seo],
};
