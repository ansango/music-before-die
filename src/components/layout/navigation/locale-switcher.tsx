import Link from "next/link";

import { i18n } from "@/i18n";
import { useGetLocale } from "@/lib";

export const LocaleSwitcher = () => {
  const { locale } = useGetLocale();
  const redirectedPathName = (locale) => "/";
  return (
    <li className="dropdown dropdown-end">
      <label
        className="no-underline normal-case btn btn-ghost btn-circle hover:no-underline focus:bg-transparent"
        tabIndex={0}
      >
        {locale}
      </label>
      <ul className="w-20 p-2 shadow dropdown-content menu bg-base-100 rounded-box" tabIndex={0}>
        <li>
          {i18n.locales.map((loc) => {
            return (
              <Link href={redirectedPathName(loc)} key={loc} className="px-1 py-1">
                {loc}
              </Link>
            );
          })}
        </li>
      </ul>
    </li>
  );
};
