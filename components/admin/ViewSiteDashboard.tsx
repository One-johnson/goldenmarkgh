import { getSiteUrlFromSettings } from "@/lib/site-url";

export default async function ViewSiteDashboard() {
  const siteUrl = await getSiteUrlFromSettings();

  return (
    <div style={{ marginBottom: "var(--base)" }}>
      <a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1rem 1.25rem",
          borderRadius: "var(--style-radius-m)",
          border: "1px solid var(--theme-elevation-150)",
          background: "var(--theme-elevation-50)",
          color: "var(--theme-text)",
          textDecoration: "none",
        }}
      >
        <span>
          <strong>View live website</strong>
          <br />
          <span
            style={{
              color: "var(--theme-elevation-800)",
              fontSize: "0.875rem",
            }}
          >
            {siteUrl}
          </span>
        </span>
        <span aria-hidden style={{ fontSize: "1.125rem" }}>
          ↗
        </span>
      </a>
      <p
        style={{
          marginTop: "0.5rem",
          marginBottom: 0,
          fontSize: "0.8125rem",
          color: "var(--theme-elevation-800)",
        }}
      >
        Update the URL anytime under{" "}
        <strong>Site Settings → Public website URL</strong>.
      </p>
    </div>
  );
}
