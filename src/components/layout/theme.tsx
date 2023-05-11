"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider } from "../context";

import { GlobalDrawer, GlobalDrawerSide, DrawerContent } from "./drawer";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: ReactNode;
};

export const Theme: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <GlobalDrawer>
        <DrawerContent className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </DrawerContent>
        <GlobalDrawerSide>
          <ul className="p-4 menu w-80 bg-base-200">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </GlobalDrawerSide>
      </GlobalDrawer>
    </ThemeProvider>
  );
};
