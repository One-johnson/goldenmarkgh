import type { GlobalConfig } from "payload";
import { revalidateAfterGlobalChange } from "@/hooks/revalidateGlobal";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterGlobalChange],
  },
  fields: [
    {
      name: "siteUrl",
      type: "text",
      label: "Public website URL",
      defaultValue: "https://goldenmarkgh.vercel.app",
      admin: {
        description:
          "Canonical public URL for SEO metadata, sitemap, robots.txt, and the admin “View website” link. Does not control which domain serves the site — point your DNS to Vercel for that. Use https:// with no trailing slash.",
        placeholder: "https://goldenmarkgh.vercel.app",
      },
    },
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
