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
  const areSomeLink = links.some(({ href }) => href === path);
  if (!areSomeLink) return null;
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
