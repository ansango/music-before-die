import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { DefaultContainer } from "@/components";
import { getArtists, getContentArtist } from "@/lib";

type PageProps = {
  params: {
    artist: string;
  };
};

const replaceSource = (url: string) =>
  url.replaceAll("src/content", "").replaceAll(".mdx", "").replaceAll("/albums", "/discos");

export default async function ArtistPage({ params: { artist } }: PageProps) {
  const { body, albums } = await getContentArtist(artist);

  return (
    <>
      <DefaultContainer className="max-w-screen-lg prose">
        <TinaMarkdown content={body} />
      </DefaultContainer>

      <DefaultContainer className="grid max-w-screen-lg grid-cols-3 gap-4">
        {albums?.map((album) => {
          console.log(album);
          return (
            <Link
              className="p-4 bg-base-200 link link-hover underline-offset-4"
              key={album?.album.id}
              href={replaceSource(album?.album.id || "")}
            >
              {album?.album.name}
            </Link>
          );
        })}
      </DefaultContainer>
    </>
  );
}

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
