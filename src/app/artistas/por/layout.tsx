import type { PropsWithChildren } from "react";

import Link from "next/link";

import { DefaultContainer } from "@/components";
import { PageBlocks } from "@/components/cms";
import { getContentPage } from "@/lib";

export default async function Layout({ children }: PropsWithChildren) {
  const { blocks } = await getContentPage("artistas");
  return (
    <>
      <PageBlocks blocks={blocks} />
      <DefaultContainer className="max-w-screen-lg space-x-10">
        <Link href="/artistas/por/genero">Genero</Link>
        <Link href="/artistas/por/letra">Letra</Link>
      </DefaultContainer>

      {children}
    </>
  );
}
