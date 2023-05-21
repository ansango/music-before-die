import type { ReactNode } from "react";

import { ArtistNavigation } from "@/components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ArtistNavigation />
      {children}
    </>
  );
}
