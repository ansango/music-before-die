import Link from "next/link";

import { useLocaleSwitcher } from "@/components/context";

export const LocaleSwitcher = () => {
  const { locale, destinations } = useLocaleSwitcher();

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
          {destinations?.map(({ link, locale }) => {
            return (
              <Link href={link} key={locale} className="px-1 py-1">
                {locale}
              </Link>
            );
          })}
        </li>
      </ul>
    </li>
  );
};
