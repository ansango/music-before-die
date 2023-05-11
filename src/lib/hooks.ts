"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const useGetLocale = () => {
  let pathname = usePathname();
  if (!pathname) pathname = "/";
  const segments = pathname.split("/");
  return { locale: segments[1] as Locale, pathname, segments };
};
