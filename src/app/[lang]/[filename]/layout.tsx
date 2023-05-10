import type { ReactNode } from "react";

import type { Metadata } from "next";

import { Theme, Transition } from "@/components";
import type { Locale } from "@/i18n";
import { i18n } from "@/i18n";
import { getPage } from "@/lib";

type Params = {
  filename: string;
  lang: Locale;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { filename, lang } = params;
  const relativePath = `${lang}/${filename}.mdx`;
  const page = await getPage(relativePath);

  const title = page?.seo?.title;
  const description = page?.seo?.description;

  const url = `${process.env.NEXT_PUBLIC_WEB_URI}/${
    params.filename === "index" ? params.lang : `${params.lang}/${params.filename}`
  }`;

  return {
    title: `${title ?? "X"} | Música antes de morir`,
    description: description ?? "Música que escuchar antes de irse para el otro barrio",
    authors: [
      {
        name: "Anibal Santos",
        url: `${process.env.NEXT_PUBLIC_WEB_URI}`,
      },
    ],
    openGraph: {
      type: "website",
      title: `${title ?? "X"} | Música antes de morir`,
      description: description ?? "Música antes de morir",
      url,
      locale: params.lang,
      siteName: "Música antes de morir",
      countryName: "Spain",
      emails: ["anibalsantosgo@gmail.com"],
    },
    alternates: {
      canonical: url,
      languages: i18n.locales.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: `${process.env.NEXT_PUBLIC_WEB_URI}/${
            params.filename === "index" ? cur : `${cur}/${params.filename}`
          }`,
        }),
        {}
      ),
      media: {
        "image/png": `${process.env.NEXT_PUBLIC_WEB_URI}/avatar.jpeg`,
      },
    },
    robots: {
      follow: true,
      index: true,
      "max-image-preview": "standard",
      notranslate: true,
      "max-snippet": 100,
    },
  };
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Theme>
      <Transition className="flex flex-col flex-1">{children}</Transition>
    </Theme>
  );
}
