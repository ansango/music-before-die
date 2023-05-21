import type { FC } from "react";

import Link from "next/link";
import slugify from "slugify";

import { genres } from "@/constants/genres";
import type { ArtistWithGenres } from "@/lib";
import { matchArtistByGenre, getArtistsWithGenre } from "@/lib";

type ArtistGenreProps = { artists: Array<ArtistWithGenres>; limit?: number };

const ArtistsByGenre: FC<ArtistGenreProps> = ({ artists, limit = 8 }) => {
  return (
    <section className="space-y-10">
      {genres.map((genre) => {
        const artistsByGenre = matchArtistByGenre(genre, artists);
        const areMore = artistsByGenre && artistsByGenre.length > limit;
        return artistsByGenre?.length === 0 ? null : (
          <>
            <div key={genre} className="space-y-5">
              <h2 className="mb-3 text-2xl font-bold ">{genre.toLowerCase()}</h2>
              <div className="!m-0 divider" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    href={`/artistas/genero/${slugify(genre, { lower: true })}`}
                    className="p-4 bg-base-200 link link-hover underline-offset-4"
                  >
                    Ver más
                  </Link>
                )}
              </div>
            </div>
          </>
        );
      })}
    </section>
  );
};

export default async function Page() {
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;
  return <ArtistsByGenre artists={artists} />;
}
