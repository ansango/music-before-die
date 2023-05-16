import type { FC } from "react";

import Link from "next/link";
import slugify from "slugify";

import { DefaultContainer } from "@/components";
import type { ArtistWithGenres } from "@/lib";
import { getArtistsWithGenre, matchArtistByGenre, getArtistsByGenre } from "@/lib";

import { genres } from "../../../../../../tina/schema/objects";

const ArtistsByGenre: FC<{ artists: Array<ArtistWithGenres> }> = ({ artists }) => {
  return (
    <DefaultContainer className="max-w-screen-lg space-y-10">
      <div className="grid grid-cols-3 gap-4">
        {artists
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
      </div>
    </DefaultContainer>
  );
};

type PageProps = {
  params: {
    genre: string;
  };
};

export default async function Page({ params }: PageProps) {
  const artists = (await getArtistsByGenre(params.genre)) as Array<ArtistWithGenres>;
  return (
    <>
      <DefaultContainer className="max-w-screen-lg space-y-10">
        <h1 className="text-4xl font-bold">{params.genre}</h1>
      </DefaultContainer>
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
