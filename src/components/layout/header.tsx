import type { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

// import { useGetLocale } from "@/lib";

import { Container } from "../container";
// import { useCustomRouter } from "../context";

import { DrawerButton, useGlobalDrawerId } from "./drawer";
import { LocaleSwitcher, ThemeSwitcher } from "./navigation";

export const Header: FC = () => {
  const segment = usePathname();
  const navigation: any[] = [];
  const locale = "en";
  // const { locale, allDocuments, currentDocs, redirect } = useCustomRouter();
  // const navigation = currentDocs;
  // // console.log(locale, allDocuments, currentDocs);
  const drawerId = useGlobalDrawerId();
  return (
    <header>
      <Container className="max-w-screen-lg navbar bg-base-100">
        <div className="flex-1">
          <a className="normal-case btn btn-sm btn-ghost">mbd</a>
        </div>
        <nav className="flex-none">
          <ul className="flex-none hidden px-1 menu menu-horizontal lg:flex">
            {navigation.map((item, i) => {
              const route = `/${item.href.trim()}`;
              const routeIndex = route === `/${locale}/` ? `/${locale}` : route;
              const isActive = segment === routeIndex;
              return (
                <li key={`${item.label}-${i}`}>
                  <Link
                    href={item.href}
                    className={`btn btn-link hover:underline-offset-4 normal-case ${
                      isActive ? "underline-offset-4" : "no-underline"
                    } `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <LocaleSwitcher />
        <ThemeSwitcher />
        <DrawerButton drawerId={drawerId} className="btn btn-circle btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              d="M4 8h16M4 16h16"
            ></path>
          </svg>
        </DrawerButton>
      </Container>
    </header>
  );
};
