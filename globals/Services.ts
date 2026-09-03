import type { GlobalConfig } from "payload";
import { revalidateAfterGlobalChange } from "@/hooks/revalidateGlobal";
import { ctaBandFields } from "./sharedFields";

export const Services: GlobalConfig = {
  slug: "services",
  label: "Services Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterGlobalChange],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "services",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "image",
          type: "text",
          admin: { description: "Public path, e.g. /uploads/service.jpg" },
        },
        { name: "ctaText", type: "text" },
        { name: "ctaLink", type: "text" },
      ],
    },
    {
      name: "body",
      type: "richText",
      label: "Page content",
    },
    ...ctaBandFields,
  ],
};
