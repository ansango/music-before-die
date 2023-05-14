import type { Locale } from "@/i18n";
import { getArtists } from "@/lib";

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
    locale: page.locale,
  }));
}

type PageProps = {
  params: {
    filename: string;
    locale: Locale;
  };
};

export default function ArtistPage({ params }: PageProps) {
  return <>{JSON.stringify(params)}</>;
}
