/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--sans)", ...fontFamily.sans],
        serif: ["var(--serif)", ...fontFamily.serif],
        display: ["var(--display)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
    require("tailwindcss-fluid-type")({
      settings: {
        fontSizeMin: 1.125,
        fontSizeMax: 1.25,
        ratioMin: 1.125,
        ratioMax: 1.2,
        screenMin: 20,
        screenMax: 96,
        unit: "rem",
        prefix: "",
      },
      values: {
        xs: [-2, 1.6],
        sm: [-1, 1.6],
        base: [0, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        "2xl": [3, 1.2],
        "3xl": [4, 1.2],
        "4xl": [5, 1.1],
        "5xl": [6, 1.1],
        "6xl": [7, 1.1],
        "7xl": [8, 1],
        "8xl": [9, 1],
        "9xl": [10, 1],
      },
    }),
    require("daisyui"),
  ],

  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    themes: ["lofi", "black"],
    darkTheme: "black",
  },
};
