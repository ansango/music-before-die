import { notFound } from "next/navigation";

import type { BodySimpleProps, HeroBaseProps } from "@/components/cms";
import { BodySimple, HeroBase } from "@/components/cms";
import type { Props as GlobalProps } from "@/components/context";
import { GlobalProvider } from "@/components/context";
import type { Locale } from "@/i18n";
import { getPages, getPage } from "@/lib";

type Params = {
  filename: string;
  lang: Locale;
};

export async function generateStaticParams() {
  return ((await getPages()) ?? []).map((page) => {
    return { filename: page._sys?.filename };
  });
}

export default async function Page({ params }: { params: Params }) {
  const { filename, lang } = params;
  const relativePath = `${filename}.${lang}.mdx`;
  const content = await getPage(relativePath);
  if (!content || !content.page.blocks) notFound();
  const { global, page } = content;

  return (
    <GlobalProvider {...(global as GlobalProps)}>
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
    </GlobalProvider>
  );
}
