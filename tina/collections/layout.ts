import type { Collection } from "tinacms";

import { labelField, linkField, visibleField } from "../fields";

const defaultNavItem = {
  href: "home",
  label: "Home",
  visible: false,
};

export const layoutModule = (): Array<Collection> => [
  {
    label: "layout",
    name: "global",
    path: "src/content/global",
    format: "json",
    fields: [
      {
        type: "object",
        label: "Navigation",
        name: "navigation",
        list: true,
        ui: {
          itemProps: ({ label }) => ({ label }),
          defaultItem: defaultNavItem,
        },

        fields: [
          visibleField({ required: true }),
          linkField({ required: true }),
          labelField({ required: true }),
        ],
      },
      {
        type: "object",
        label: "Social Links",
        name: "social",
        list: true,
        ui: {
          itemProps: ({ label }) => ({ label }),
          defaultItem: defaultNavItem,
        },

        fields: [
          visibleField({ required: true }),
          linkField({ required: true }),
          labelField({ required: true }),
        ],
      },
    ],
  },
];
