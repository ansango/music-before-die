"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

import { useGlobalData } from "@/lib";

import { Footer } from "./footer";
import { Header } from "./header";

export const Theme: FC<Props> = ({ children }) => {
  const { navigation, social } = useGlobalData();

  return (
    <ThemeProvider attribute="class" themes={["light", "dark"]} enableSystem={false}>
      <Header
        {...{
          navigation,
        }}
      />
      {children}
      <Footer
        {...{
          navigation,
          social,
        }}
      />
    </ThemeProvider>
  );
};
