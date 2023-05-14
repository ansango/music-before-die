import { notFound } from "next/navigation";

import type { BodySimpleProps, HeroBaseProps } from "@/components/cms";
import { BodySimple, HeroBase } from "@/components/cms";
import type { Locale } from "@/i18n";
import { getPages, getPage } from "@/lib";

export async function generateStaticParams() {
  return ((await getPages()) ?? []).map((page) => ({
    filename: page._sys?.filename,
  }));
}

type PageProps = {
  params: {
    filename: string;
    locale: Locale;
  };
};

export default async function Page({ params }: PageProps) {
  const relativePath = `${params.filename}.${params.locale}.mdx`;

  const content = await getPage(relativePath);
  if (!content || !content.page.blocks) notFound();
  const { page } = content;

  return (
    <>
      {page.blocks?.map((block, index) => {
        const key = `${block?.__typename}-${index}`;
        switch (block?.__typename) {
          case "PagesBlocksHeroBase": {
            if (!block?.visible) return null;
            return <HeroBase key={key} {...(block as HeroBaseProps)} />;
          }
          case "PagesBlocksBodySimple": {
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
