import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <article className="max-w-screen-lg mx-auto">{children}</article>;
}
