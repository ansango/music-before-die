import Link from "next/link";

import { DefaultSection } from "@/components";
import { getAlbums, replaceSrc } from "@/lib";

export default async function Page() {
  const albums = await getAlbums();

  return (
    <>
      <h1 className="text-3xl font-bold">Todos los discos</h1>
      <hr className="my-2" />
      <DefaultSection>
        <ul className="grid grid-cols-12 pl-0 sm:gap-5 md:gap-10">
          {albums?.map(({ id, _sys, name, artwork, artist, genres }) => {
            return (
              <li
                key={id}
                className="w-full col-span-12 pl-0 list-none sm:col-span-6 md:col-span-4 lg:col-span-3 card card-compact bg-base-100"
              >
                <Link
                  key={_sys?.filename}
                  href={replaceSrc(id ?? "", "albums", "discos")}
                  className="space-y-5 no-underline"
                >
                  <figure className="p-0 my-0">
                    <img src={artwork ?? ""} alt={name} />
                  </figure>
                  <div className="!p-0 card-body h-44">
                    <h3 className="mt-0 line-clamp-2 card-title">{artist?.name}</h3>
                    <h4 className="italic font-normal line-clamp-2">{name}</h4>
                    {genres
                      ?.map((genre) => (
                        <span key={genre} className="badge">
                          {genre}
                        </span>
                      ))
                      .slice(0, 2)}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </DefaultSection>
    </>
  );
}
