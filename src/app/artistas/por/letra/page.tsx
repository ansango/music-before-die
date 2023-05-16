import type { FC } from "react";

import Link from "next/link";
import slugify from "slugify";

import { DefaultContainer } from "@/components";
import { getArtists, matchArtistByLetter } from "@/lib";

import type { Artists } from "../../../../../tina/__generated__/types";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

type ArtistGenreProps = { artists: Array<Artists>; limit?: number };

const ArtistsByLetter: FC<ArtistGenreProps> = ({ artists, limit = 8 }) => {
  return (
    <DefaultContainer className="max-w-screen-lg space-y-10">
      {letters.map((letter) => {
        const artistsByLetter = matchArtistByLetter(letter, artists);
        const areMore = artistsByLetter && artistsByLetter.length > limit;
        return artistsByLetter?.length === 0 ? null : (
          <div key={letter} className="space-y-5">
            <h2 className="text-2xl font-bold">{letter.toLowerCase()}</h2>

            <div className="grid grid-cols-3 gap-4">
              {artistsByLetter
                ?.map((artist) => (
                  <Link
                    key={artist._sys?.filename}
                    href={`/artistas/${artist._sys?.filename}`}
                    className="p-4 bg-base-200 link link-hover underline-offset-4"
                  >
                    {artist.name}
                  </Link>
                ))
                .slice(0, limit)}

              {areMore && (
                <Link
                  href={`/artistas/por/genero/${slugify(letter, { lower: true })}`}
                  className="p-4 bg-base-200 link link-hover underline-offset-4"
                >
                  Ver más
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </DefaultContainer>
  );
};

export default async function Page() {
  const artists = (await getArtists()) as Array<Artists>;
  return <ArtistsByLetter artists={artists} />;
}
