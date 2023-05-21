"use client";

import type { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/artistas/genero", label: "Genero" },
  { href: "/artistas/letra", label: "Letra" },
];

export const ArtistNavigation: FC = () => {
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
