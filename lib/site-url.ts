import { getPayload } from "payload";
import config from "@payload-config";

/** Default while testing on Vercel; override in Site Settings for production. */
export const DEFAULT_SITE_URL = "https://goldenmarkgh.vercel.app";

export function resolveSiteUrl(siteUrl?: string | null): string {
  const fromSettings = siteUrl?.trim();
  if (fromSettings) {
    return fromSettings.replace(/\/$/, "");
  }

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  return DEFAULT_SITE_URL;
}

export async function getSiteUrlFromSettings(): Promise<string> {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: "settings",
    overrideAccess: true,
  });

  return resolveSiteUrl(settings.siteUrl as string | undefined);
}
