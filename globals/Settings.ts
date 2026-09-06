import type { GlobalConfig } from "payload";
import { revalidateAfterGlobalChange } from "@/hooks/revalidateGlobal";
import { navLinkFields } from "./sharedFields";

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
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "siteUrl",
              type: "text",
              label: "Public website URL",
              defaultValue: "https://goldenmarkgh.vercel.app",
              admin: {
                description:
                  "Canonical public URL for SEO metadata, sitemap, robots.txt, and the admin “View website” link. Use https:// with no trailing slash.",
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
          ],
        },
        {
          label: "Header",
          fields: [
            {
              name: "navBadgeText",
              type: "text",
              label: "Badge text",
              defaultValue: "GoldBod Licensed",
              admin: {
                description:
                  "Small badge next to the logo in the header. Leave empty to hide.",
              },
            },
            {
              name: "navLinks",
              type: "array",
              label: "Navigation links",
              minRows: 1,
              admin: {
                description: "Main menu links shown in the header (and footer pages list).",
              },
              fields: navLinkFields,
            },
            {
              name: "navCtaText",
              type: "text",
              label: "Header button text",
              required: true,
            },
            {
              name: "navCtaLink",
              type: "text",
              label: "Header button link",
              required: true,
              admin: { description: "Path or URL for the header call-to-action button." },
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            {
              name: "footerBlurb",
              type: "textarea",
              label: "Footer description",
              required: true,
              admin: {
                description: "Short company summary shown under the logo in the footer.",
              },
            },
            {
              name: "footerCtaText",
              type: "text",
              label: "Footer button text",
              required: true,
            },
            {
              name: "footerCtaLink",
              type: "text",
              label: "Footer button link",
              required: true,
            },
            {
              name: "footerPagesHeading",
              type: "text",
              label: "Pages column heading",
              defaultValue: "Pages",
            },
            {
              name: "footerContactHeading",
              type: "text",
              label: "Contact column heading",
              defaultValue: "Contact Us",
              admin: {
                description:
                  "Heading for the contact block. Email, address and phone come from the Contact Page global.",
              },
            },
            {
              name: "footerCopyright",
              type: "text",
              label: "Copyright line",
              defaultValue: "GOLDENMARK GHANA LTD. All rights reserved.",
              admin: {
                description: "Shown after the © symbol and current year.",
              },
            },
          ],
        },
      ],
    },
  ],
};
