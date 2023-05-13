import type { TinaField } from "tinacms";

import { i18n } from "../../../src/i18n";

import { seo } from "./seo";

const pattern = /^[a-z]+(?:-[a-z]+)*$/;
const patternSegment = /^[/][a-zA-Z]+([/-][a-zA-Z]+)*$/;

export const page: Array<TinaField> = [
  {
    type: "string",
    label: "ID",
    name: "filename_id",
    required: true,
    ui: {
      validate(value: string) {
        if (!value) return "Required.";
        if (!pattern.test(value)) return "Only lower letters and dashes allowed.";
      },
    },
    description:
      "Unique identifier for the filename equal in i18n versions: about => about.es.mdx, about.en.mdx",
  },
  {
    type: "string",
    label: "Segment",
    name: "segment",
    required: true,
    description: "Segment of the url: /about, /sobre-nosotros",
    ui: {
      validate(value: string) {
        if (!value) return "Required.";
        if (value === "/") return;
        if (!patternSegment.test(value)) return "Not a valid segment.";
      },
    },
  },
  {
    type: "string",
    label: "Lang",
    name: "locale",
    options: i18n.locales.map((locale) => locale),
    required: true,
    description: "Language of the page",
    ui: {
      component: "radio-group",
    },
  },
];

export const pageWithSeo: Array<TinaField> = [...page, seo];
