import { notFound } from "next/navigation";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

import type { BodySimpleProps, HeroBaseProps } from "@/components/cms";
import { BodySimple, HeroBase } from "@/components/cms";
import type { Locale } from "@/i18n";
import { getAllPagesConnection, replacePath, getPage } from "@/lib";

import type { En_PageBlocks, Es_PageBlocks } from "../../../../tina/__generated__/types";

type PageBlocks = En_PageBlocks | Es_PageBlocks;

type Params = {
  filename: string;
  lang: Locale;
};

type PageTina = {
  _sys: {
    filename: string;
    path: string;
  };
};

export async function generateStaticParams() {
  const pages = (await getAllPagesConnection()) as Array<PageTina>;
  return pages.map((page) => ({
    params: {
      filename: page._sys.filename,
      lang: replacePath(page._sys.path).split("/")[0],
    },
  }));
}

export default async function Page({ params }: { params: Params }) {
  const data = await getPage({ params });
  const blocks = data?.blocks as Array<PageBlocks>;
  if (!data || !data.visible || !blocks) notFound();

  return (
    <>
      {blocks?.map((block, iBlock) => {
        const key = `${block?.__typename}-${iBlock}`;
        switch (block?.__typename) {
          case "En_pageBlocksHeroBase":
          case "Es_pageBlocksHeroBase": {
            if (!block.visible) return null;
            return <HeroBase key={key} {...(block as HeroBaseProps)} />;
          }

          case "En_pageBlocksBodySimple":
          case "Es_pageBlocksBodySimple": {
            const content = block.content as TinaMarkdownContent;
            if (!block.visible || content.children.length === 0) return null;
            return <BodySimple key={key} {...(block as BodySimpleProps)} />;
          }
          default:
            return null;
        }
      })}
    </>
  );
}
