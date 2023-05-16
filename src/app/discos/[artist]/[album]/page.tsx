import { TinaMarkdown } from "tinacms/dist/rich-text";

import { DefaultContainer } from "@/components";
import { getAlbums, getArtists, getContentAlbum } from "@/lib";

type PageProps = {
  params: {
    artist: string;
    album: string;
  };
};

export default async function AlbumPage({ params: { album, artist } }: PageProps) {
  const { body } = await getContentAlbum(`${artist}/${album}`);

  return (
    <DefaultContainer className="max-w-screen-lg prose">
      <TinaMarkdown content={body} />
    </DefaultContainer>
  );
}

export async function generateStaticParams() {
  const artists = await getArtists();
  const albums = await getAlbums();

  return albums
    ?.map((page) => ({
      artist: artists?.find((artist) =>
        artist.albums?.find((album) => album?.album.id === page._sys?.filename)
      )?.id,
      album: page._sys?.filename,
    }))
    .filter((page) => page.artist && page.album) as Array<PageProps["params"]>;
}
