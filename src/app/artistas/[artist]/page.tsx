import { lastFmClient } from "lastfm-client-ts";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { GreyCard, GreyCardList } from "@/components";
import { getArtists, getContentArtist, replaceSrc, slugify } from "@/lib";

const {
  artistApiMethods: { getSimilar },
} = lastFmClient();

const getSimilarArtists = async (artist: string) => {
  const {
    similarartists: { artist: similar },
  } = await getSimilar({ artist, limit: 200 });

  const artistsSimilar = similar
    .map((artist) => slugify(artist.name))
    .filter((art) => art !== slugify(artist));

  const artists = await getArtists();
  return artists?.filter((art) => artistsSimilar.includes(slugify(art.name ?? "")));
};

type PageProps = {
  params: {
    artist: string;
  };
};

export default async function ArtistPage({ params: { artist } }: PageProps) {
  const { body, albums, name } = await getContentArtist(artist);
  const relatedArtists = await getSimilarArtists(name);

  return (
    <article>
      <TinaMarkdown content={body} />
      <section>
        <GreyCardList>
          {albums?.map((album) => {
            const id = album?.album.id || "";
            return (
              <GreyCard key={id} href={replaceSrc(id, "albums", "discos")}>
                {album?.album.name}
              </GreyCard>
            );
          })}
        </GreyCardList>
      </section>
      {relatedArtists && relatedArtists.length > 0 && (
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
      )}
    </article>
  );
}

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
