import { DefaultLayout, DefaultMainTransition } from "@/components";
import { PageBlocks } from "@/components/cms";
import { getContentPage } from "@/lib";

export default async function Home() {
  const { blocks } = await getContentPage("index");
  return (
    <DefaultLayout>
      <DefaultMainTransition className="flex flex-col flex-1">
        <PageBlocks blocks={blocks} />
      </DefaultMainTransition>
    </DefaultLayout>
  );
}
