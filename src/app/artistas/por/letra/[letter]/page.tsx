import type { FC } from "react";

import Link from "next/link";

import { DefaultContainer } from "@/components";
import { getArtists, getArtistsByLetter, matchArtistByLetter } from "@/lib";

import type { Artists } from "../../../../../../tina/__generated__/types";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

type ArtistLetterProps = { artists: Array<Artists> };

const ArtistsByLetter: FC<ArtistLetterProps> = ({ artists }) => {
  return (
    <DefaultContainer className="max-w-screen-lg space-y-10">
      <div className="grid grid-cols-3 gap-4">
        {artists?.map((artist) => (
          <Link
            key={artist._sys?.filename}
            href={`/artistas/${artist._sys?.filename}`}
            className="p-4 bg-base-200 link link-hover underline-offset-4"
          >
            {artist.name}
          </Link>
        ))}
      </div>
    </DefaultContainer>
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
      <DefaultContainer className="max-w-screen-lg space-y-10">
        <Link href="/artistas/por/letra" className="link link-hover">
          Volver
        </Link>
      </DefaultContainer>
      <DefaultContainer className="max-w-screen-lg space-y-10">
        <h1 className="text-4xl font-bold">{letter}</h1>
      </DefaultContainer>
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
