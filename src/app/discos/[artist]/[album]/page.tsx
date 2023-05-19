import { TinaMarkdown } from "tinacms/dist/rich-text";

import { getAlbums, getArtists, getContentAlbum } from "@/lib";

type PageProps = {
  params: {
    artist: string;
    album: string;
  };
};

export default async function AlbumPage({ params: { album, artist } }: PageProps) {
  const { body } = await getContentAlbum(`${artist}/${album}`);

  return <TinaMarkdown content={body} />;
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
