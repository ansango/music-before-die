"use client";

import type { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DefaultContainer } from "../layout";

const links = [
  { href: "/artistas/por/genero", label: "Genero" },
  { href: "/artistas/por/letra", label: "Letra" },
];

export const ArtistNavigation: FC = () => {
  const path = usePathname();

  return (
    <DefaultContainer className="max-w-screen-lg space-x-10">
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
    </DefaultContainer>
  );
};
