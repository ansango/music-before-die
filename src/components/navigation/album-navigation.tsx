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
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`link link-hover hover:underline-offset-4 ${
            path === href ? "!underline-offset-4 underline" : ""
          }`.trim()}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
