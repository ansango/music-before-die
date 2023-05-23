/* eslint-disable @next/next/no-img-element */

import { lastFmClient } from "lastfm-client-ts";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { GreyCard, GreyCardList } from "@/components";
import { formatDate, getAlbums, getArtists, getContentAlbum, replaceSrc, slugify } from "@/lib";

const {
  artistApiMethods: { getSimilar },
} = lastFmClient();

type PageProps = {
  params: {
    artist: string;
    album: string;
  };
};

const getSimilarArtists = async (artist: string) => {
  const {
    similarartists: { artist: similar },
  } = await getSimilar({ artist, limit: 500 });
  const artistsSimilar = similar.map((artist) => slugify(artist.name));
  const artists = await getArtists();
  return artists?.filter((artist) => artistsSimilar.includes(slugify(artist.name ?? "")));
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
  } = await getContentAlbum(`${artist}/${album}`);

  const relatedArtists = await getSimilarArtists(band.name);

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
        <TinaMarkdown content={body} />
      </section>
      <section>
        <h3>Artistas similares</h3>
        <GreyCardList>
          {relatedArtists?.map((artist) => {
            const id = artist.id ?? "";
            return (
              <GreyCard key={id} href={replaceSrc(id, "artists", "artistas")}>
                {artist.name}
              </GreyCard>
            );
          })}
        </GreyCardList>
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
