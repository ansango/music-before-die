import type { ChangeEvent } from "react";

import slugify from "slugify";
import type { Collection, TinaField } from "tinacms";

import { pageWithSeo } from "../objects";

const genres = [
  "Rock",
  "Pop",
  "Hip Hop",
  "Electronic",
  "Folk",
  "Jazz",
  "Classical",
  "Latin",
  "Reggae",
  "Blues",
  "Metal",
  "Punk",
  "Country",
  "R&B",
  "Soul",
  "Funk",
  "Disco",
  "New Age",
  "Ambient",
  "Soundtrack",
  "Indie",
  "Alternative",
  "Experimental",
];

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
  {
    type: "object",
    label: "Tracklist",
    name: "tracklist",
    list: true,
    description: "Tracklist of the album",
    fields: [
      {
        type: "string",
        label: "Name",
        name: "name",
        required: true,
        description: "Name of the track",
      },
      {
        type: "number",
        label: "Duration",
        name: "duration",
        required: true,
        description: "Duration of the track",
      },
    ],
  },
  {
    type: "string",
    label: "Genre",
    name: "genre",
    required: true,
    description: "Genre of the album",
    list: true,
    ui: {
      component({ field, input }) {
        return (
          <div className="relative last:mb-0">
            <label className="block mb-2 font-sans text-xs font-semibold text-gray-700 whitespace-normal">
              {field.label}
              <span className="block font-sans text-xs italic font-light text-gray-400 pt-0.5 whitespace-normal m-0">
                {field.description}
              </span>
            </label>
            <div className="grid grid-cols-2 mb-5 md:grid-cols-3">
              {genres.map((option) => {
                const value = slugify(option, { lower: true });
                return (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="relative w-4 h-4 transition duration-150 ease-out cursor-pointer"
                      type="checkbox"
                      value={value}
                      checked={input.value.includes(value)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const checked = e.target.checked;
                        if (checked) {
                          input.onChange([...input.value, value] as unknown as ChangeEvent<string>);
                        } else {
                          input.onChange(
                            input.value.filter((v) => v !== value) as unknown as ChangeEvent<string>
                          );
                        }
                      }}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      },
    },
  },
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
  fields: [...pageWithSeo, ...albumFields],
};
