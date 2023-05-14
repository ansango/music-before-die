import type { FC } from "react";

import { useTheme } from "next-themes";

import { useMounted } from "@/lib";

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const onClick = () => {
    const themeCondition = theme === "black" ? "lofi" : "black";
    setTheme(themeCondition);
  };

  return (
    <button onClick={onClick} className="btn btn-circle btn-ghost">
      {/* tabler-icons */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        {mounted && (
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d={
              theme === "black"
                ? "M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
                : "M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
            }
          ></path>
        )}
      </svg>
    </button>
  );
};
