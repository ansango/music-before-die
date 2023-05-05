import type { ReactNode } from "react";

import { Theme, Transition } from "@/components";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Theme>
        <Transition className="flex flex-col flex-1">{children}</Transition>
      </Theme>
    </div>
  );
}
