import { notFound } from "next/navigation";

import { PageBlocks } from "@/components/cms";
import { getPages, getPage } from "@/lib";

type PageProps = {
  params: {
    filename: string;
  };
};

export default async function Page({ params }: PageProps) {
  const relativePath = `${params.filename}.mdx`;
  const content = await getPage(relativePath);
  if (!content || !content.page.blocks) notFound();
  const { page } = content;

  return <PageBlocks blocks={page.blocks} />;
}

export async function generateStaticParams() {
  return ((await getPages()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}
