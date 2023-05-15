import { notFound } from "next/navigation";

import { DefaultLayout, DefaultMainTransition } from "@/components";
import { PageBlocks } from "@/components/cms";
import { getPage } from "@/lib";

export default async function Home() {
  const content = await getPage("index.mdx");
  if (!content || !content.page.blocks) notFound();
  const { page } = content;
  return (
    <DefaultLayout>
      <DefaultMainTransition className="flex flex-col flex-1">
        <PageBlocks blocks={page.blocks} />
      </DefaultMainTransition>
    </DefaultLayout>
  );
}
