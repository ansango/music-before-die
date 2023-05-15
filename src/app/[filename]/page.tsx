import { PageBlocks } from "@/components/cms";
import { getPages, getContentPage } from "@/lib";

type PageProps = {
  params: {
    filename: string;
  };
};

export default async function Page({ params: { filename } }: PageProps) {
  const { blocks } = await getContentPage(filename);
  return <PageBlocks blocks={blocks} />;
}

export async function generateStaticParams() {
  return ((await getPages()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
