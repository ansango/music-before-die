import { TinaMarkdown } from "tinacms/dist/rich-text";

import { DefaultContainer } from "@/components";
import { getArtists, getContentArtist } from "@/lib";

type PageProps = {
  params: {
    filename: string;
  };
};

export default async function ArtistPage({ params: { filename } }: PageProps) {
  const { body } = await getContentArtist(filename);

  return (
    <DefaultContainer className="max-w-screen-lg prose">
      <TinaMarkdown content={body} />
    </DefaultContainer>
  );
}

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
