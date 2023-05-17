"use client";

import type { FC } from "react";

import Link from "next/link";

type Link = {
  href: string;
  label: string;
};

export const Breadcrumbs: FC<{ links: Array<Link> }> = ({ links }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {links.map(({ href, label }, i) => (
          <li key={i}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
