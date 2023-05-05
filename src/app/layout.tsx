import type { ReactNode } from "react";

import "../styles/globals.css";
import { Inter, Bebas_Neue, PT_Serif } from "next/font/google";

export const metadata = {
  title: "Música antes de morir | Aníbal Santos",
  description: "Música que escuchar antes de irse para el otro barrio",
  authors: [
    {
      name: "Anibal Santos",
      url: `${process.env.NEXT_PUBLIC_WEB_URI}`,
    },
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Música antes de morir",
    countryName: "Spain",
    emails: ["anibalsantosgo@gmail.com"],
  },
  alternates: {
    media: {
      "image/png": `${process.env.NEXT_PUBLIC_WEB_URI}/avatar.jpeg`,
    },
  },
  robots: {
    follow: true,
    index: true,
    "max-image-preview": "standard",
    notranslate: true,
    "max-snippet": 100,
  },
};

const display = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--display",
  display: "swap",
});

const serif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const debugCn = process.env.NODE_ENV === "development" ? "debug-screens" : "";
  const fonts = `${display.variable} ${serif.variable} ${sans.variable}`;
  const cnBody = `min-h-screen flex flex-col ${fonts} ${debugCn}`;
  return (
    <html lang="en">
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
