import type { ReactNode } from "react";

import { AlbumNavigation } from "@/components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AlbumNavigation />
      {children}
    </>
  );
}
