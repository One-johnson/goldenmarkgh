import type { GlobalConfig } from "payload";
import { ctaBandFields, titleDescriptionArray } from "./sharedFields";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "heroHeading", type: "text", required: true },
    { name: "heroDescription", type: "textarea", required: true },
    { name: "ctaText", type: "text", required: true },
    { name: "ctaLink", type: "text", required: true },
    { name: "secondaryCtaText", type: "text" },
    { name: "secondaryCtaLink", type: "text" },
    {
      name: "heroImage",
      type: "text",
      admin: { description: "Public path, e.g. /uploads/hero.jpg" },
    },
    {
      name: "body",
      type: "textarea",
      admin: { description: "Markdown body content" },
    },
    { name: "processHeading", type: "text" },
    titleDescriptionArray("processSteps", "Process Steps"),
    { name: "whyChooseUsHeading", type: "text" },
    titleDescriptionArray("whyChooseUs", "Why Choose Us"),
    ...ctaBandFields,
  ],
};
