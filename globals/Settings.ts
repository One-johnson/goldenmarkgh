import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  access: {
    read: () => true,
  },
  fields: [
    { name: "brandName", type: "text", required: true },
    {
      name: "logo",
      type: "text",
      admin: { description: "Public path, e.g. /uploads/logo.png" },
    },
    {
      name: "favicon",
      type: "text",
      admin: { description: "Public path, e.g. /uploads/icon.png" },
    },
    { name: "footerBlurb", type: "textarea", required: true },
    { name: "navCtaText", type: "text", required: true },
    { name: "navCtaLink", type: "text", required: true },
    { name: "footerCtaText", type: "text", required: true },
    { name: "footerCtaLink", type: "text", required: true },
  ],
};
