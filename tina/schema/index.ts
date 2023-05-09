import type { Schema } from "tinacms";

import * as collections from "./collections";

export const schema: Schema = {
  collections: Object.keys(collections).map((key) => (collections as never)[key]),
};
