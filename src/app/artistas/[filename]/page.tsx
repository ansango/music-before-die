import { getArtists } from "@/lib";

type PageProps = {
  params: {
    filename: string;
  };
};

export default function ArtistPage({ params }: PageProps) {
  return <>{JSON.stringify(params)}</>;
}

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
