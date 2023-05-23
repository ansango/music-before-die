import type { FC, PropsWithChildren } from "react";

import Link from "next/link";

export const GreyCard: FC<PropsWithChildren & { href: string }> = ({ children, href }) => {
  return (
    <li className="pl-0 my-0 list-none">
      <Link className="flex w-full p-4 bg-base-200 link link-hover underline-offset-4" href={href}>
        {children}
      </Link>
    </li>
  );
};

export const GreyCardSkeleton: FC = () => (
  <li className="p-8 my-0 list-none bg-base-200 animate-pulse" />
);

export const GreyCardList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className="grid grid-cols-1 gap-4 pl-0 md:grid-cols-2 lg:grid-cols-3">{children}</ul>;
};
