import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/content";
import { resolveSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const siteUrl = resolveSiteUrl(settings.siteUrl);
  const routes = ["", "/about", "/services", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
