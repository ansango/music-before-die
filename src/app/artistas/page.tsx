import Link from "next/link";

import { DefaultContainer } from "@/components";
import { PageBlocks } from "@/components/cms";
import { getContentPage, getArtists } from "@/lib";

export default async function Page() {
  const { blocks } = await getContentPage("artistas");
  const artists = await getArtists();

  return (
    <>
      <PageBlocks blocks={blocks} />
      <DefaultContainer className="grid max-w-screen-lg grid-cols-3 gap-4">
        {artists?.map((artist) => (
          <Link
            key={artist._sys?.filename}
            href={`/artistas/${artist._sys?.filename}`}
            className="p-4 bg-base-200 link link-hover underline-offset-4"
          >
            {artist.name}
          </Link>
        ))}
      </DefaultContainer>
    </>
  );
}
