import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact Page",
  access: {
    read: () => true,
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
      type: "collapsible",
      label: "Department mailboxes",
      fields: [
        {
          name: "emailInfo",
          type: "email",
          required: true,
          label: "Info inbox",
          admin: {
            description: "Default inbox for general inquiries and form fallback.",
          },
        },
        { name: "emailTrade", type: "email", required: true, label: "Trade inbox" },
        {
          name: "emailFinance",
          type: "email",
          required: true,
          label: "Finance inbox",
        },
        {
          name: "emailOperations",
          type: "email",
          required: true,
          label: "Operations inbox",
        },
        { name: "emailCeo", type: "email", required: true, label: "CEO inbox" },
      ],
    },
    { name: "address", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "formHeading", type: "text" },
    { name: "formDescription", type: "textarea" },
    { name: "formButtonText", type: "text" },
    { name: "formSuccessMessage", type: "textarea" },
  ],
};
