import { TinaMarkdown } from "tinacms/dist/rich-text";

import { GreyCard, GreyCardList } from "@/components";
import { getArtists, getContentArtist, replaceSrc } from "@/lib";

type PageProps = {
  params: {
    artist: string;
  };
};

export default async function ArtistPage({ params: { artist } }: PageProps) {
  const { body, albums } = await getContentArtist(artist);

  return (
    <>
      <TinaMarkdown content={body} />

      <GreyCardList>
        {albums?.map((album) => {
          const id = album?.album.id || "";
          return (
            <GreyCard key={id} href={replaceSrc(id, "albums", "discos")}>
              {album?.album.name}
            </GreyCard>
          );
        })}
      </GreyCardList>
    </>
  );
}

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
