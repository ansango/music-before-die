"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider as NextThemeProvider } from "next-themes";

import { GlobalProvider } from "./global-provider";

type Props = {
  children: ReactNode;
};

const config = {
  themes: ["lofi", "black"],
  enableSystem: false,
  attribute: "data-theme",
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <GlobalProvider>
      <NextThemeProvider {...config}>{children}</NextThemeProvider>
    </GlobalProvider>
  );
};
