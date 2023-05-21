import type { FC } from "react";

import Link from "next/link";
import slugify from "slugify";

import { genres } from "@/constants/genres";
import type { ArtistWithGenres } from "@/lib";
import { getArtistsWithGenre, matchArtistByGenre, getArtistsByGenre } from "@/lib";

type ArtistGenreProps = { artists: Array<ArtistWithGenres> };

const ArtistsByGenre: FC<ArtistGenreProps> = ({ artists }) => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {artists?.map((artist) => (
        <Link
          key={artist._sys?.filename}
          href={`/artistas/${artist._sys?.filename}`}
          className="p-4 bg-base-200 link link-hover underline-offset-4"
        >
          {artist.name}
        </Link>
      ))}
    </section>
  );
};

type PageProps = {
  params: {
    genre: string;
  };
};

export default async function Page({ params: { genre } }: PageProps) {
  const artists = (await getArtistsByGenre(genre)) as Array<ArtistWithGenres>;
  return (
    <>
      <Link href="/artistas/por/genero" className="link link-hover">
        Volver
      </Link>
      <h1 className="text-4xl font-bold">{genre}</h1>
      <ArtistsByGenre artists={artists} />
    </>
  );
}

export async function generateStaticParams() {
  const artists = (await getArtistsWithGenre()) as Array<ArtistWithGenres>;
  return genres
    .map((genre) => ({
      artists: matchArtistByGenre(genre, artists),
      genre: slugify(genre, { lower: true }),
    }))
    .filter((page) => page.artists && page.artists.length > 0);
}
