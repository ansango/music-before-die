/* eslint-disable @next/next/no-img-element */

import { TinaMarkdown } from "tinacms/dist/rich-text";

import { TracksTable } from "@/components/table/TracksTable";
import { formatDate, getAlbums, getArtists, getContentAlbum } from "@/lib";

type PageProps = {
  params: {
    artist: string;
    album: string;
  };
};

const components = {
  TracksTable: TracksTable,
};

export default async function AlbumPage({ params: { album, artist } }: PageProps) {
  const {
    artwork,
    name,
    artist: band,
    release,
    genres,
    rating,
    body,
    tracklist,
  } = await getContentAlbum(`${artist}/${album}`);

  return (
    <article>
      <section className="grid grid-cols-12 md:gap-10">
        {artwork && (
          <figure className="col-span-12 md:col-span-6 card">
            <img src={artwork} alt={name} />
          </figure>
        )}
        <div className="col-span-12 md:my-8 md:col-span-6">
          <h1>{name}</h1>
          <h2>{band.name}</h2>
          <time className="italic">{formatDate(release)}</time>
          <ul className="pl-0">
            {genres?.map((genre) => (
              <li className="mr-3 badge" key={genre}>
                {genre}
              </li>
            ))}
          </ul>
          <div className="rating rating-half">
            <input type="radio" name="rating-10" className="!w-0 rating-hidden" />
            {Array.from({ length: 5 * 2 }, (_, i) => (i + 1) / 2).map((i) => {
              return (
                <input
                  readOnly
                  key={i}
                  type="radio"
                  name="rating-10"
                  checked={(rating ?? 0.5) === i}
                  className={`mask mask-star-2 ${
                    (i * 2) % 2 === 0 ? `mask-half-2` : `mask-half-1`
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <TinaMarkdown content={body} components={components} />
      </section>
      <section>
        {tracklist && (
          <TracksTable
            data={
              tracklist.map((track) => ({
                name: track?.name,
                duration: track?.duration,
              })) as Array<{ name: string; duration: string }>
            }
          />
        )}
      </section>
    </article>
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
