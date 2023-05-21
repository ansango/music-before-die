import Link from "next/link";

import { DefaultSection } from "@/components";
import { getAlbums, replaceSrc } from "@/lib";

export default async function Page() {
  const albums = await getAlbums();

  return (
    <DefaultSection className="grid grid-cols-3 gap-4">
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
    </DefaultSection>
  );
}
