import type { FC } from "react";

import Link from "next/link";
import slugify from "slugify";

import { DefaultContainer } from "@/components";
import { PageBlocks } from "@/components/cms";
import {
  getContentPage,
  getArtistsWithGenre,
  matchArtistByGenre,
  type ArtistWithGenres,
} from "@/lib";

import { genres } from "../../../tina/schema/objects";

const ArtistsByGenre: FC<{ artists: Array<ArtistWithGenres> }> = ({ artists }) => {
  return (
    <DefaultContainer className="max-w-screen-lg space-y-10">
      {genres.map((genre) => {
        const artistsByGenre = matchArtistByGenre(genre, artists);
        return artistsByGenre?.length === 0 ? null : (
          <div key={genre} className="space-y-5">
            <span>{genre}</span>

            <div className="grid grid-cols-3 gap-4">
              {artistsByGenre
                ?.map((artist) => (
                  <Link
                    key={artist._sys?.filename}
                    href={`/artistas/${artist._sys?.filename}`}
                    className="p-4 bg-base-200 link link-hover underline-offset-4"
                  >
                    {artist.name}
                  </Link>
                ))
                .slice(0, 8)}
              <Link
                href={`/artistas/por/genero/${slugify(genre, { lower: true })}`}
                className="p-4 bg-base-200 link link-hover underline-offset-4"
              >
                Ver más
              </Link>
            </div>
          </div>
        );
      })}
    </DefaultContainer>
  );
};

export default async function Page() {
  const { blocks } = await getContentPage("artistas");
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;

  return (
    <>
      <PageBlocks blocks={blocks} />
      <ArtistsByGenre artists={artists} />
    </>
  );
}
