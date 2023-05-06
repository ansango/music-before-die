import type { TinaField } from "tinacms";

export const titleField = ({
  required = false,
  isTitle = false,
}: {
  required?: boolean;
  isTitle?: boolean;
}): TinaField => ({
  type: "string",
  name: "title",
  label: "Title",
  isTitle,
  required,
});

export const visibleField = ({ required = false }: { required?: boolean }): TinaField => ({
  name: "visible",
  label: "Visible",
  type: "boolean",
  required,
});

export const descriptionField = (): TinaField => ({
  name: "description",
  label: "Description",
  type: "string",
  ui: {
    component: "textarea",
  },
});

export const linkField = ({ required = false }: { required?: boolean }): TinaField => ({
  type: "string",
  name: "href",
  label: "Link",
  required,
});

export const labelField = ({ required = false }: { required?: boolean }): TinaField => ({
  type: "string",
  name: "label",
  label: "Label",
  required,
});
