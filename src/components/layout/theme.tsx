"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

import { useGetLocale, useGlobalData } from "@/lib";

import { Footer } from "./footer";
import { Header } from "./header";

export const Theme: FC<Props> = ({ children }) => {
  const { header, footer } = useGlobalData();
  const { locale: currentLocale } = useGetLocale();

  return (
    <ThemeProvider attribute="class" themes={["light", "dark"]} enableSystem={false}>
      {header && (
        <Header
          {...{
            navigation: header.links.map(({ locale }) => locale[currentLocale]),
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
    </ThemeProvider>
  );
};
