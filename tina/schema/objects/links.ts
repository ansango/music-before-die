import type { TinaField } from "tinacms";

const patternSegment = /^[/][a-zA-Z]+([/-][a-zA-Z]+)*$/;

export const segments = ({
  name,
  label,
  description,
}: {
  name: string;
  label?: string;
  description?: string;
}): TinaField => ({
  type: "object",
  list: true,
  label: label || name.charAt(0).toUpperCase() + name.slice(1) + " Segments",
  name,
  description,

  ui: {
    itemProps(item) {
      return {
        label: item.value,
      };
    },
  },
  fields: [
    {
      type: "string",
      label: "Value",
      name: "value",
      required: true,

      ui: {
        validate(value: string) {
          if (!value) return "Required.";
          if (value === "/") return;
          if (!patternSegment.test(value)) return "Not a valid segment.";
        },
      },
    },
  ],
});

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
