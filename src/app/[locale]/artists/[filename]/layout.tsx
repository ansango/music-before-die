import type { ReactNode } from "react";

import { Layout, Transition } from "@/components";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <Transition className="flex flex-col flex-1">{children}</Transition>
    </Layout>
  );
}
