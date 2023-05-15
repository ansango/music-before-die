import { TinaMarkdown } from "tinacms/dist/rich-text";

import { DefaultContainer } from "@/components";
import { getAlbums, getContentAlbum } from "@/lib";

type PageProps = {
  params: {
    album: string;
  };
};

export default async function AlbumPage({ params: { album } }: PageProps) {
  const { body } = await getContentAlbum(album);

  return (
    <DefaultContainer className="max-w-screen-lg prose">
      <TinaMarkdown content={body} />
    </DefaultContainer>
  );
}

export async function generateStaticParams() {
  return ((await getAlbums()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
