import type { ReactNode } from "react";

import { DefaultLayout, DefaultMainTransition } from "@/components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DefaultLayout>
      <DefaultMainTransition className="flex flex-col flex-1">{children}</DefaultMainTransition>
    </DefaultLayout>
  );
}
