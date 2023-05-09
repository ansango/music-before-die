import type { Template } from "tinacms";

export const heroBaseTemplate: Template = {
  name: "heroBase",
  label: "Hero Base",

  fields: [
    {
      type: "boolean",
      label: "Visible",
      name: "visible",
    },

    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },

    {
      type: "string",
      label: "Text",
      name: "text",
    },

    {
      type: "string",
      label: "Align",
      name: "align",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Center",
          value: "center",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
    {
      type: "string",
      label: "Rotation Title",
      name: "rotationTitle",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Center",
          value: "center",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
  ],
};
