import type { ReactNode } from "react";

import "../../styles/globals.css";
import { Inter } from "next/font/google";

import type { Locale } from "../../i18n";
// import { i18n } from "../../i18n";

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

// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }));
// }

type RootLayoutProps = {
  children: ReactNode;
  params: {
    lang: Locale;
  };
};

export default function LangLayout({ children, params: { lang } }: RootLayoutProps) {
  const debugCn = process.env.NODE_ENV === "development" ? "debug-screens" : "";
  const fonts = `${display.variable} ${serif.variable} ${sans.variable}`;
  const cnBody = `${fonts} ${debugCn}`;
  return (
    <html lang={lang}>
      <link href="/site.webmanifest" rel="manifest" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color="#4a9885" href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#ffffff" name="theme-color" />
      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta content="/browserconfig.xml" name="msapplication-config" />
      <body className={cnBody}>{children}</body>
    </html>
  );
}
