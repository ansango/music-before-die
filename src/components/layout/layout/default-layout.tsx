"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { GlobalDrawer, GlobalDrawerSide, DrawerContent } from "../drawer";
import { Footer } from "../footer";
import { Header } from "../header";

type Props = {
  children: ReactNode;
};

const config = {
  themes: ["lofi", "black"],
  enableSystem: false,
  attribute: "data-theme",
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider {...config}>
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
