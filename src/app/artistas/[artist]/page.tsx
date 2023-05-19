import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";

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

      <section className="grid grid-cols-3 gap-4">
        {albums?.map((album) => {
          const id = album?.album.id || "";
          return (
            <Link
              className="p-4 bg-base-200 link link-hover underline-offset-4"
              key={album?.album.id}
              href={replaceSrc(id, "albums", "discos")}
            >
              {album?.album.name}
            </Link>
          );
        })}
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
