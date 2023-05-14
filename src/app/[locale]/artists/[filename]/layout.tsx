import type { ReactNode } from "react";

import { DefaultLayout, DefaultMainTransition } from "@/components";
import { i18n } from "@/i18n";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function ArtistLayout({ children }: { children: ReactNode }) {
  return (
    <DefaultLayout>
      <DefaultMainTransition className="flex flex-col flex-1">{children}</DefaultMainTransition>
    </DefaultLayout>
  );
}
