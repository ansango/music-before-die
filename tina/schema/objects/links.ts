import type { TinaField } from "tinacms";

export const links = ({
  name,
  label,
  description,
}: {
  name: string;
  label?: string;
  description?: string;
}): TinaField => ({
  type: "object",
  label: label || name.charAt(0).toUpperCase() + name.slice(1) + " Links",
  name,
  description,
  list: true,
  ui: {
    itemProps: ({ label }) => ({ label }),
  },
  fields: [
    {
      type: "string",
      label: "Link",
      name: "href",
    },
    {
      type: "string",
      label: "Label",
      name: "label",
    },
  ],
});
