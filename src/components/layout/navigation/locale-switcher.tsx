import Link from "next/link";

// import { useCustomRouter } from "@/components/context";
import { i18n } from "@/i18n";

export const LocaleSwitcher = () => {
  // const { redirect, locale } = useCustomRouter();

  return (
    <li className="dropdown dropdown-end">
      <label
        className="no-underline normal-case btn btn-ghost btn-circle hover:no-underline focus:bg-transparent"
        tabIndex={0}
      >
        {/* {locale} */}
      </label>
      <ul className="w-20 p-2 shadow dropdown-content menu bg-base-100 rounded-box" tabIndex={0}>
        <li>
          {i18n.locales.map((loc) => {
            return (
              <Link href={"/"} key={loc} className="px-1 py-1">
                {loc}
              </Link>
            );
          })}
        </li>
      </ul>
    </li>
  );
};
