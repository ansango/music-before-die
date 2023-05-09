import type { Template } from "tinacms";

export const bodySimpleTemplate: Template = {
  name: "bodySimple",
  label: "Body Simple",

  fields: [
    {
      type: "boolean",
      label: "Visible",
      name: "visible",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "string",
      label: "Size",
      name: "size",
      options: ["md", "lg", "xl"],
    },
    {
      type: "string",
      label: "Center",
      name: "center",
      options: ["left", "center", "right"],
    },
    {
      type: "string",
      label: "Align",
      name: "align",
      options: ["left", "center", "right"],
    },
    {
      type: "string",
      label: "Padding Top",
      name: "paddingTop",
      options: ["none", "md", "lg", "xl"],
    },
    {
      type: "string",
      label: "Padding Bottom",
      name: "paddingBottom",
      options: ["none", "md", "lg", "xl"],
    },
  ],
};
