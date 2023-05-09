import { notFound } from "next/navigation";

import type { BodySimpleProps, HeroBaseProps } from "@/components/cms";
import { BodySimple, HeroBase } from "@/components/cms";
import type { Locale } from "@/i18n";
import { getPages, getPage } from "@/lib";

type Params = {
  filename: string;
  lang: Locale;
};

export async function generateStaticParams() {
  return ((await getPages()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { filename, lang } = params;
  const relativePath = `${lang}/${filename}.mdx`;
  const page = await getPage(relativePath);
  if (!page || !page.blocks) notFound();

  return (
    <>
      {page.blocks?.map((block, index) => {
        const key = `${block?.__typename}-${index}`;
        switch (block?.__typename) {
          case "PageBlocksHeroBase": {
            if (!block?.visible) return null;
            return <HeroBase key={key} {...(block as HeroBaseProps)} />;
          }
          case "PageBlocksBodySimple": {
            if (!block.visible || block.content.children.length === 0) return null;
            return <BodySimple key={key} {...(block as BodySimpleProps)} />;
          }
          default: {
            return null;
          }
        }
      })}
    </>
  );
}
