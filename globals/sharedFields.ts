import type { Field } from "payload";

export const titleDescriptionArray = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
  ],
});

export const ctaBandFields: Field[] = [
  { name: "ctaBandHeading", type: "text" },
  { name: "ctaBandDescription", type: "textarea" },
  { name: "ctaBandButtonText", type: "text" },
  { name: "ctaBandButtonLink", type: "text" },
];

export const navLinkFields: Field[] = [
  {
    name: "label",
    type: "text",
    required: true,
    admin: { description: "Link text shown in the menu." },
  },
  {
    name: "href",
    type: "text",
    required: true,
    admin: {
      description: "Path or URL, e.g. /about or https://example.com",
    },
  },
];
