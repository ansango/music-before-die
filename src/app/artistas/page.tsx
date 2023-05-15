import { PageBlocks } from "@/components/cms";
import { getContentPage } from "@/lib";

export default async function Page() {
  const { blocks } = await getContentPage("artistas");
  return <PageBlocks blocks={blocks} />;
}
