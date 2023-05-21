"use client";

import type { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/discos", label: "Discos" },
  { href: "/discos/destacados", label: "Destacados" },
  { href: "/discos/mejor-valorados", label: "Mejor valorados" },
];

export const AlbumNavigation: FC = () => {
  const path = usePathname();

  return (
    <nav className="space-x-10 py-container">
      {links.map(({ href, label }) => {
        return (
          <Link
            key={href}
            href={href}
            className={`btn btn-ghost normal-case font-medium btn-sm ${
              path === href ? "border-2 border-base-300" : ""
            }`.trim()}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
