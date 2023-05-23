import type { FC } from "react";

import Link from "next/link";

import { getArtists, getArtistsByLetter, matchArtistByLetter } from "@/lib";

import type { Artists } from "../../../../../../tina/__generated__/types";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

type ArtistLetterProps = { artists: Array<Artists> };

const ArtistsByLetter: FC<ArtistLetterProps> = ({ artists }) => {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    letter: string;
  };
};

export default async function Page({ params: { letter } }: PageProps) {
  const artists = (await getArtistsByLetter(letter)) as Array<Artists>;

  return (
    <>
      <h1 className="text-4xl font-bold">{letter}</h1>
      <ArtistsByLetter artists={artists} />
    </>
  );
}

export async function generateStaticParams() {
  const artists = (await getArtists()) as Array<Artists>;
  return letters
    .map((letter) => ({
      artists: matchArtistByLetter(letter, artists),
      letter: letter.toLowerCase(),
    }))
    .filter((page) => page.artists && page.artists.length > 0);
}
