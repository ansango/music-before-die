import Link from "next/link";

import { DefaultContainer } from "@/components";
import { PageBlocks } from "@/components/cms";
import { getAlbums, getContentPage, replaceSrc } from "@/lib";

export default async function Page() {
  const { blocks } = await getContentPage("discos");
  const albums = await getAlbums();

  return (
    <>
      <PageBlocks blocks={blocks} />
      <DefaultContainer className="grid max-w-screen-lg grid-cols-3 gap-4">
        {albums?.map((album) => {
          const id = album?.id || "";
          return (
            <Link
              key={album._sys?.filename}
              href={replaceSrc(id, "albums", "discos")}
              className="p-4 bg-base-200 link link-hover underline-offset-4"
            >
              {album.name}
            </Link>
          );
        })}
      </DefaultContainer>
    </>
  );
}
