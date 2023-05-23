import { GreyCard, GreyCardList } from "@/components";
import { getArtists, getArtistsByLetter, matchArtistByLetter } from "@/lib";

import type { Artists } from "../../../../../../tina/__generated__/types";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

type PageProps = {
  params: {
    letter: string;
  };
};

export default async function Page({ params: { letter } }: PageProps) {
  const artists = (await getArtistsByLetter(letter)) as Array<Artists>;
  return (
    <article>
      <h1 className="text-4xl font-bold">{letter}</h1>
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
  const artists = (await getArtists()) as Array<Artists>;
  return letters
    .map((letter) => ({
      artists: matchArtistByLetter(letter, artists),
      letter: letter.toLowerCase(),
    }))
    .filter((page) => page.artists && page.artists.length > 0);
}
