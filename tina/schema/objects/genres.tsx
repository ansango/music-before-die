import type { ChangeEvent } from "react";

import slugify from "slugify";
import type { TinaField } from "tinacms";

export const genres = [
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

const GenreInput = ({
  field,
  input,
}: {
  field: TinaField;
  input: {
    value: string[];
    onChange: (value: ChangeEvent<string>) => void;
  };
}) => {
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
};

export const genresField: TinaField = {
  type: "string",
  label: "Genres",
  name: "genres",
  description: "Genre of the album",
  list: true,
  ui: {
    component: GenreInput,
  },
};
