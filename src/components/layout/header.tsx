import type { FC } from "react";
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { i18n } from "@/i18n-config";
import { useMounted } from "@/lib";

import { Container } from "../container";

type LinkJSON = {
  label: string;
  href: string;
  visible?: boolean;
};

type Props = {
  navigation: Array<LinkJSON>;
};

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const onClick = () => {
    const themeCondition = theme === "dark" ? "light" : "dark";
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
              {theme === "dark" ? (
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

const getLocale = (pathname: string | null) => {
  if (!pathname) pathname = "/";
  const segments = pathname.split("/");
  return segments[1];
};

const LocaleSwitcher = () => {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center justify-center px-2 uppercase bg-gray-300 rounded-md h-9 text-primary bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {locale}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 flex flex-col w-16 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {i18n.locales.map((locale) => {
            return (
              <Link href={redirectedPathName(locale)} key={locale} className="px-1 py-1">
                <Menu.Item>
                  <span className="mx-2 uppercase cursor-pointer">{locale}</span>
                </Menu.Item>
              </Link>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const Header: FC<Props> = ({ navigation }) => {
  const segment = usePathname();

  return (
    <header>
      <Container className="flex items-start justify-between">
        <ThemeChanger />
        <nav>
          <ul className="flex flex-col items-end space-y-2">
            {navigation
              .filter((item) => item.visible)
              .map((item, i) => {
                return (
                  <li key={`${item.label}-${i}`}>
                    <Link
                      href={`/${item.href}`}
                      className={
                        segment === `/${item.href}`
                          ? "underline underline-offset-4 block odd:rotate-[1.5deg] even:-rotate-[1.5deg]"
                          : ""
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
        <LocaleSwitcher />
      </Container>
    </header>
  );
};
