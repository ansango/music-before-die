import { GreyCardList, GreyCard } from "@/components";
import { genres } from "@/constants/genres";
import type { ArtistWithGenres } from "@/lib";
import { getArtistsWithGenre, matchArtistByGenre, getArtistsByGenre, slugify } from "@/lib";

type PageProps = {
  params: {
    genre: string;
  };
};

export default async function Page({ params: { genre } }: PageProps) {
  const artists = (await getArtistsByGenre(genre)) as Array<ArtistWithGenres>;
  return (
    <article>
      <h1 className="text-4xl font-bold">{genre}</h1>
      <GreyCardList>
        {artists?.map((artist) => (
          <GreyCard key={artist._sys?.filename} href={`/artistas/${artist._sys?.filename}`}>
            {artist.name}
          </GreyCard>
        ))}
      </GreyCardList>
    </article>
  );
}

export async function generateStaticParams() {
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;
  return genres
    .map((genre) => ({
      artists: matchArtistByGenre(genre, artists),
      genre: slugify(genre),
    }))
    .filter((page) => page.artists && page.artists.length > 0);
}
