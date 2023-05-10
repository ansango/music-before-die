import type { FC } from "react";
import { Fragment } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { i18n } from "@/i18n";
import { useGetLocale, useMounted } from "@/lib";

type Props = {
  navigation: Array<LinkJSON>;
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const onClick = () => {
    const themeCondition = theme === "black" ? "lofi" : "black";
    setTheme(themeCondition);
  };

  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        className="w-7 h-7 link"
      >
        <g fill="none" fillRule="evenodd">
          {mounted && (
            <>
              {theme === "black" ? (
                <>
                  <path
                    fill="currentColor"
                    d="M512 704a192 192 0 1 0 0-384a192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512a256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"
                  ></path>
                </>
              ) : (
                <path
                  fill="currentColor"
                  d="M240.448 240.448a384 384 0 1 0 559.424 525.696a448 448 0 0 1-542.016-542.08a390.592 390.592 0 0 0-17.408 16.384zm181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696z"
                ></path>
              )}
            </>
          )}
        </g>
      </svg>
    </button>
  );
};

const LocaleSwitcher = () => {
  const { locale, redirectedPathName } = useGetLocale();

  return (
    <>
      <li tabIndex={0}>
        <a>
          {locale}
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li>
            {i18n.locales.map((loc) => {
              return (
                <Link href={redirectedPathName(loc)} key={loc} className="px-1 py-1">
                  {loc}
                </Link>
              );
            })}
          </li>
        </ul>
      </li>
    </>
  );
};

export const Header: FC<Props> = ({ navigation }) => {
  const segment = usePathname();
  const { locale } = useGetLocale();

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-base normal-case btn btn-ghost">mbd</a>
      </div>
      <nav className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          {navigation
            .filter((item) => item.visible)
            .map((item, i) => {
              const route = `/${locale}/${item.href.trim()}`;
              const routeIndex = route === `/${locale}/` ? `/${locale}` : route;
              const isActive = segment === routeIndex;
              return (
                <li key={`${item.label}-${i}`}>
                  <Link
                    href={route}
                    className={
                      isActive
                        ? "underline underline-offset-4 block"
                        : "text-xl normal-case btn btn-ghost"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          <LocaleSwitcher />
          <ThemeSwitcher />
        </ul>
      </nav>
    </header>
  );
};
