import { getSiteUrlFromSettings } from "@/lib/site-url";

export default async function ViewSiteAction() {
  const siteUrl = await getSiteUrlFromSettings();

  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: "var(--theme-text)",
        textDecoration: "none",
        padding: "0.375rem 0.75rem",
        borderRadius: "var(--style-radius-s)",
        border: "1px solid var(--theme-elevation-150)",
        background: "var(--theme-elevation-50)",
        whiteSpace: "nowrap",
      }}
    >
      View website
    </a>
  );
}
