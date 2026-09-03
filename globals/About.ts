import type { GlobalConfig } from "payload";
import { revalidateAfterGlobalChange } from "@/hooks/revalidateGlobal";
import { ctaBandFields, titleDescriptionArray } from "./sharedFields";

export const About: GlobalConfig = {
  slug: "about",
  label: "About Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterGlobalChange],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "companyDescription", type: "textarea", required: true },
    { name: "mission", type: "textarea", required: true },
    { name: "vision", type: "textarea", required: true },
    titleDescriptionArray("values", "Values"),
    {
      name: "body",
      type: "richText",
      label: "Page content",
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
