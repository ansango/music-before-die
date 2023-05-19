import type { ReactNode } from "react";

import { Inter } from "next/font/google";

import "./globals.css";

import { DefaultLayout, DefaultMainTransition } from "@/components";
import { GlobalProvider } from "@/components/context";
import { getContent } from "@/lib";

const display = Inter({
  subsets: ["latin"],
  variable: "--display",
  display: "swap",
});

const serif = Inter({
  subsets: ["latin"],
  variable: "--serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

type LayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const content = await getContent();

  const debugCn = process.env.NODE_ENV === "development" ? "debug-screens" : "";
  const fonts = `${display.variable} ${serif.variable} ${sans.variable}`;
  const cnBody = `${fonts} ${debugCn}`.trim();

  return (
    <html lang="es">
      <link href="/site.webmanifest" rel="manifest" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color="#4a9885" href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#ffffff" name="theme-color" />
      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta content="/browserconfig.xml" name="msapplication-config" />
      <body className={cnBody}>
        <GlobalProvider content={content}>
          <DefaultLayout>
            <DefaultMainTransition className="flex flex-col flex-1 w-full max-w-screen-lg p-4 mx-auto prose sm:p-6 md:p-12">
              {children}
            </DefaultMainTransition>
          </DefaultLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
