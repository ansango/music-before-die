import Link from "next/link";

import { DefaultSection } from "@/components";
import { getAlbums, replaceSrc } from "@/lib";

export default async function Page() {
  const albums = await getAlbums();

  return (
    <DefaultSection>
      <ul className="grid grid-cols-12 gap-5 pl-0">
        {albums?.map(({ id, _sys, name, artwork, artist, genres }) => {
          return (
            <li
              key={id}
              className="col-span-12 pl-0 list-none shadow-sm sm:col-span-6 md:col-span-4 lg:col-span-3 card-compact bg-base-100"
            >
              <Link
                key={_sys?.filename}
                href={replaceSrc(id ?? "", "albums", "discos")}
                className="no-underline"
              >
                <figure>
                  <img src={artwork} alt={name} />
                </figure>
                <div className="card-body h-44">
                  <h3 className="mt-0 line-clamp-2">{artist?.name}</h3>
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
  );
}
