import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "@/i18n";

import rewwritsjson from "../../../config/rewrites.json";

interface UrlMapping {
  source: string;
  destination: string;
}

function areUrlsSimilar(url1: string, url2: string, mappings: UrlMapping[]): boolean {
  const MAX_DISTANCE = 3; // distancia máxima permitida para considerar las URLs como similares
  for (const mapping of mappings) {
    const distance = levenshteinDistance(url1, mapping.source);
    if (distance <= MAX_DISTANCE && url2 === mapping.destination) {
      return true;
    }
  }
  return false;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  const m = str1.length;
  const n = str2.length;
  for (let i = 0; i <= m; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // eliminación
          matrix[i][j - 1] + 1, // inserción
          matrix[i - 1][j - 1] + 1 // reemplazo
        );
      }
    }
  }
  return matrix[m][n];
}

export const LocaleSwitcher = () => {
  const pathname = usePathname();
  const isPage = pathname.split("/").length <= 2;
  console.log(pathname);
  //TODO: implement

  console.log(redirect);
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
