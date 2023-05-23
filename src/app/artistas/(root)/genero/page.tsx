import type { FC } from "react";

import { Divider, GreyCard, GreyCardList } from "@/components";
import { genres } from "@/constants/genres";
import type { ArtistWithGenres } from "@/lib";
import { matchArtistByGenre, getArtistsWithGenre, slugify } from "@/lib";

type ArtistGenreProps = { artists: Array<ArtistWithGenres>; limit?: number };

const ArtistsByGenre: FC<ArtistGenreProps> = ({ artists, limit = 8 }) => {
  return (
    <article className="space-y-10">
      {genres.map((genre) => {
        const artistsByGenre = matchArtistByGenre(genre, artists);
        const areMore = artistsByGenre && artistsByGenre.length > limit;
        return artistsByGenre?.length === 0 ? null : (
          <section key={genre} className="space-y-5">
            <header>
              <h2 className="mt-0 mb-3 text-2xl font-bold ">{genre.toLowerCase()}</h2>
              <Divider />
            </header>
            <GreyCardList>
              {artistsByGenre
                ?.map((artist) => (
                  <GreyCard key={artist._sys?.filename} href={`/artistas/${artist._sys?.filename}`}>
                    {artist.name}
                  </GreyCard>
                ))
                .slice(0, limit)}

              {areMore && <GreyCard href={`/artistas/genero/${slugify(genre)}`}>Ver más</GreyCard>}
            </GreyCardList>
          </section>
        );
      })}
    </article>
  );
};

export default async function Page() {
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;
  return <ArtistsByGenre artists={artists} />;
}
