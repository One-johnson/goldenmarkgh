import type { GlobalConfig } from "payload";
import { revalidateAfterGlobalChange } from "@/hooks/revalidateGlobal";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterGlobalChange],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "ctaHeading", type: "text", label: "Hero heading override" },
    { name: "intro", type: "textarea", label: "Intro text under hero" },
    {
      name: "body",
      type: "richText",
      label: "Page content",
    },
    {
      name: "emailInfo",
      type: "email",
      required: true,
      label: "Info email",
      admin: {
        description: "Primary contact email shown on the site and used for form submissions.",
      },
    },
    { name: "address", type: "text", required: true },
    {
      name: "phone",
      type: "text",
      required: true,
      label: "Main phone number",
      defaultValue: "+233 592 869 555/25",
      admin: {
        description: "Primary contact number shown on the contact page and footer.",
      },
    },
    { name: "formHeading", type: "text" },
    { name: "formDescription", type: "textarea" },
    { name: "formButtonText", type: "text" },
    { name: "formSuccessMessage", type: "textarea" },
  ],
};
