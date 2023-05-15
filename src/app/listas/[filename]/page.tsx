import { DefaultContainer } from "@/components";
import { getPlaylists, getContentPlaylist } from "@/lib";

type PageProps = {
  params: {
    filename: string;
  };
};

export default async function Page({ params: { filename } }: PageProps) {
  const { id } = await getContentPlaylist(filename);
  return <DefaultContainer className="max-w-screen-lg prose">{id}</DefaultContainer>;
}

export async function generateStaticParams() {
  return ((await getPlaylists()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
