"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import globalData from "../content/global/index.json";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const useGetLocale = () => {
  let pathname = usePathname();
  if (!pathname) pathname = "/";
  const segments = pathname.split("/");

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return { locale: segments[1], redirectedPathName };
};

export const useGlobalData = () => {
  const { locale } = useGetLocale();
  const { en, es } = globalData;
  return locale === "en" ? { ...en, locale } : { ...es, locale };
};
