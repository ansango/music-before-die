import type { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePagesNavigation } from "../../context";
import { DrawerButton, useGlobalDrawerId } from "../drawer";

import { ThemeSwitcher } from "./navigation";

const DrawerAction: FC = () => {
  const drawerId = useGlobalDrawerId();
  return (
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
  );
};

const Brand: FC = () => {
  return (
    <Link href="/" className="normal-case btn btn-sm btn-ghost">
      mbd
    </Link>
  );
};

export const Header: FC = () => {
  const path = usePathname();
  const navigation = usePagesNavigation();

  return (
    <header className="w-full max-w-screen-xl p-0 mx-auto navbar min-h-fit bg-base-100 p-container">
      <div className="flex-1">
        <div className="flex-1">
          <Brand />
        </div>
        <nav className="flex-none hidden px-1 menu menu-horizontal lg:flex">
          {navigation &&
            navigation.map((item, i) => {
              const isActive = path.includes(item.link ?? "/");

              return (
                <Link
                  key={`${item?.label}-${i}`}
                  href={item?.link ?? "/"}
                  className={`btn btn-ghost normal-case font-medium btn-sm ${
                    isActive ? "!underline-offset-4 underline" : ""
                  }`.trim()}
                >
                  {item?.label}
                </Link>
              );
            })}
        </nav>

        <ThemeSwitcher />
        <DrawerAction />
      </div>
    </header>
  );
};
