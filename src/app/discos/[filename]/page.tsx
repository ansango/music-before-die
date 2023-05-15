import { TinaMarkdown } from "tinacms/dist/rich-text";

import { DefaultContainer } from "@/components";
import { getAlbums, getContentAlbum } from "@/lib";

type PageProps = {
  params: {
    filename: string;
  };
};

export default async function AlbumPage({ params: { filename } }: PageProps) {
  const { body } = await getContentAlbum(filename);

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
