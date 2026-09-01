import type { GlobalConfig } from "payload";
import { ctaBandFields, titleDescriptionArray } from "./sharedFields";

export const About: GlobalConfig = {
  slug: "about",
  label: "About Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "companyDescription", type: "textarea", required: true },
    { name: "mission", type: "textarea", required: true },
    { name: "vision", type: "textarea", required: true },
    titleDescriptionArray("values", "Values"),
    {
      name: "body",
      type: "textarea",
      admin: { description: "Markdown body content" },
    },
    { name: "complianceHeading", type: "text" },
    {
      name: "complianceItems",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "detail", type: "textarea", required: true },
      ],
    },
    { name: "ctaText", type: "text" },
    { name: "ctaLink", type: "text" },
    ...ctaBandFields,
  ],
};
