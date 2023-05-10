"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

import { useGetLocale, useGlobalData } from "@/lib";

import { Drawer, DrawerContent, DrawerSide } from "./drawer";
import { Footer } from "./footer";
import { Header } from "./header";

export const Theme: FC<Props> = ({ children }) => {
  const { header, footer } = useGlobalData();
  const { locale: currentLocale } = useGetLocale();
  const drawerId = "my-drawer-3";
  return (
    <ThemeProvider attribute="data-theme" themes={["lofi", "black"]} enableSystem={false}>
      <Drawer drawerId={drawerId}>
        <DrawerContent>
          {header && (
            <Header
              {...{
                navigation: header.links.map(({ locale }) => locale[currentLocale]),
                drawerId,
              }}
            />
          )}

          {children}

          {footer && (
            <Footer
              {...{
                navigation: footer.links.map(({ locale }) => locale[currentLocale]),
                social: footer.social.map(({ locale }) => locale[currentLocale]),
              }}
            />
          )}
        </DrawerContent>
        <DrawerSide drawerId={drawerId}>
          <ul className="p-4 menu w-80 bg-base-200">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </DrawerSide>
      </Drawer>
    </ThemeProvider>
  );
};
