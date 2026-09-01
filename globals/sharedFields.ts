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
