import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es", "it"],

  defaultLocale: "es",
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
