import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

import type { BodySimpleProps, HeroBaseProps } from "@/components/cms";
import { BodySimple, HeroBase } from "@/components/cms";
import { getPage, getPageConnection } from "@/lib";

import type { PageBlocks } from "../../../../tina/__generated__/types";

type Params = {
  filename: string;
  lang: string;
};

type PageTina = {
  _sys: {
    filename: string;
  };
};

export async function generateStaticParams() {
  const pages = (await getPageConnection()) as Array<PageTina>;
  const map = pages.map((page) => ({
    params: {
      filename: page._sys.filename,
    },
  }));
  return map;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage({ params });
  const url = `${process.env.NEXT_PUBLIC_WEB_URI}${
    params.filename === "index" ? "" : `/${params.filename}`
  }`;
  return {
    title: `${data?.title ?? "X"} | Música antes de morir`,
    description: data?.description,
    openGraph: {
      type: "website",
      title: `${data?.title ?? "X"} | Música antes de morir`,
      description: data?.description ?? "Música antes de morir",
      url,
    },
    alternates: {
      canonical: url,
      languages: {
        es: url,
      },
    },
  };
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
          case "PageBlocksHeroBase": {
            if (!block.visible) return null;
            return <HeroBase key={key} {...(block as HeroBaseProps)} />;
          }

          case "PageBlocksBodySimple": {
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
