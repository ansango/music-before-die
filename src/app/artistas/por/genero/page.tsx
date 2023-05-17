import type { FC } from "react";

import Link from "next/link";
import slugify from "slugify";

import { ArtistNavigation, Breadcrumbs, DefaultContainer } from "@/components";
import type { ArtistWithGenres } from "@/lib";
import { matchArtistByGenre, getArtistsWithGenre } from "@/lib";

import { genres } from "../../../../../tina/schema/objects";

type ArtistGenreProps = { artists: Array<ArtistWithGenres>; limit?: number };

const ArtistsByGenre: FC<ArtistGenreProps> = ({ artists, limit = 8 }) => {
  return (
    <DefaultContainer className="max-w-screen-lg space-y-10">
      {genres.map((genre) => {
        const artistsByGenre = matchArtistByGenre(genre, artists);
        const areMore = artistsByGenre && artistsByGenre.length > limit;
        return artistsByGenre?.length === 0 ? null : (
          <div key={genre} className="space-y-5">
            <h2 className="text-2xl font-bold">{genre.toLowerCase()}</h2>

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
                .slice(0, limit)}

              {areMore && (
                <Link
                  href={`/artistas/por/genero/${slugify(genre, { lower: true })}`}
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
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;
  return (
    <>
      <DefaultContainer className="max-w-screen-lg space-y-10">
        <Breadcrumbs
          links={[
            {
              href: "/artistas",
              label: "Artistas",
            },
            {
              href: "/artistas/por/genero",
              label: "Género",
            },
          ]}
        />
      </DefaultContainer>
      <ArtistNavigation />
      <ArtistsByGenre artists={artists} />
    </>
  );
}
