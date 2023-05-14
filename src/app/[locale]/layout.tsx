import type { ReactNode } from "react";

import { Inter } from "next/font/google";

import { GlobalProvider } from "@/components/context";
import type { Locale } from "@/i18n";
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
  params: {
    locale: Locale;
  };
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const content = await getContent();

  const { locale } = params;
  const debugCn = process.env.NODE_ENV === "development" ? "debug-screens" : "";
  const fonts = `${display.variable} ${serif.variable} ${sans.variable}`;
  const cnBody = `${fonts} ${debugCn}`;
  return (
    <html lang={locale}>
      <link href="/site.webmanifest" rel="manifest" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color="#4a9885" href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#ffffff" name="theme-color" />
      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta content="/browserconfig.xml" name="msapplication-config" />
      <body className={cnBody}>
        <GlobalProvider content={content}>{children}</GlobalProvider>
      </body>
    </html>
  );
}
