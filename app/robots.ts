import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/content";
import { resolveSiteUrl } from "@/lib/site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const siteUrl = resolveSiteUrl(settings.siteUrl);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
