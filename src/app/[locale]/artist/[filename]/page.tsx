import { getArtists } from "@/lib";

export async function generateStaticParams() {
  return ((await getArtists()) ?? []).map((artist) => {
    return { filename: artist._sys?.filename };
  });
}

export default function Page({ params }: { params: { filename: string } }) {
  return <>{JSON.stringify(params)}</>;
}
