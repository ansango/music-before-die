import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n";

const omitFiles = [
  "/admin",
  "/site.webmanifest",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-384x384.png",
  "/android-chrome-512x512.png",
  "/avatar.jpeg",
  "/browserconfig.xml",
  "/me.webp",
  "/mstile-150x150.png",
  "/safari-pinned-tab.svg",
];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/index.html") return;

  const pathname = request.nextUrl.pathname;

  if (omitFiles.includes(pathname)) return;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    console.log(`Redirecting to ${locale} from ${request.url}`);
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
