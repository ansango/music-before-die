import type { FC } from "react";

import Link from "next/link";

import { usePagesNavigation } from "../../context";
import { DrawerButton, useGlobalDrawerId } from "../drawer";
import { DefaultContainer } from "../utils";

import { ThemeSwitcher } from "./navigation";

export const Header: FC = () => {
  const navigation = usePagesNavigation();
  const drawerId = useGlobalDrawerId();

  return (
    <header>
      <DefaultContainer className="max-w-screen-lg navbar bg-base-100">
        <div className="flex-1">
          <a className="normal-case btn btn-sm btn-ghost">mbd</a>
        </div>
        <nav className="flex-none">
          <ul className="flex-none hidden px-1 menu menu-horizontal lg:flex">
            {navigation &&
              navigation.map((item, i) => {
                const isActive = true;
                return (
                  <li key={`${item?.label}-${i}`}>
                    <Link
                      href={item?.link ?? "/"}
                      className={`btn btn-link hover:underline-offset-4 normal-case ${
                        isActive ? "underline-offset-4" : "no-underline"
                      } `}
                    >
                      {item?.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

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
      </DefaultContainer>
    </header>
  );
};
