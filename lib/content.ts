import { getPayload } from "payload";
import config from "@payload-config";

export interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface TitleDescriptionItem {
  title: string;
  description: string;
}

export interface ComplianceItem {
  label: string;
  detail: string;
}

export interface CtaBandFields {
  ctaBandHeading?: string;
  ctaBandDescription?: string;
  ctaBandButtonText?: string;
  ctaBandButtonLink?: string;
}

export interface SiteSettings {
  brandName: string;
  logo?: string;
  favicon?: string;
  footerBlurb: string;
  navCtaText: string;
  navCtaLink: string;
  footerCtaText: string;
  footerCtaLink: string;
}

export interface HomeFrontmatter extends CtaBandFields {
  title: string;
  heroHeading: string;
  heroDescription: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroImage?: string;
  processHeading?: string;
  processSteps?: TitleDescriptionItem[];
  whyChooseUsHeading?: string;
  whyChooseUs?: TitleDescriptionItem[];
}

export interface AboutFrontmatter extends CtaBandFields {
  title: string;
  companyDescription: string;
  mission: string;
  vision: string;
  values?: TitleDescriptionItem[];
  complianceHeading?: string;
  complianceItems?: ComplianceItem[];
  ctaText?: string;
  ctaLink?: string;
}

export interface ServicesFrontmatter extends CtaBandFields {
  title: string;
  description: string;
  services: ServiceItem[];
}

export interface ContactFrontmatter {
  title: string;
  ctaHeading?: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  whatsappButtonText?: string;
  bookingCtaText?: string;
  bookingCtaLink?: string;
  formHeading?: string;
  formButtonText?: string;
  formSuccessMessage?: string;
}

export type PageSlug = "home" | "about" | "services";

export interface PageContent<T> {
  data: T;
  content: string;
}

const emptySettings: SiteSettings = {
  brandName: "Goldenmark",
  footerBlurb: "",
  navCtaText: "Partner with us",
  navCtaLink: "/services",
  footerCtaText: "Start a partnership inquiry",
  footerCtaLink: "/services",
};

function stripMeta<T extends Record<string, unknown>>(doc: T) {
  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    globalType: _globalType,
    body,
    ...rest
  } = doc as T & {
    id?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
    globalType?: unknown;
    body?: string | null;
  };

  return {
    data: rest as Omit<
      T,
      "id" | "createdAt" | "updatedAt" | "globalType" | "body"
    >,
    content: typeof body === "string" ? body : "",
  };
}

export async function getPageContent<T>(
  slug: PageSlug,
): Promise<PageContent<T>> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug,
    overrideAccess: true,
  });

  const { data, content } = stripMeta(doc as Record<string, unknown>);
  return {
    data: data as T,
    content,
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "settings",
    overrideAccess: true,
  });

  const { data } = stripMeta(doc as Record<string, unknown>);
  const settings = data as Partial<SiteSettings>;

  return {
    ...emptySettings,
    ...settings,
    brandName: settings.brandName || emptySettings.brandName,
    footerBlurb: settings.footerBlurb || emptySettings.footerBlurb,
    navCtaText: settings.navCtaText || emptySettings.navCtaText,
    navCtaLink: settings.navCtaLink || emptySettings.navCtaLink,
    footerCtaText: settings.footerCtaText || emptySettings.footerCtaText,
    footerCtaLink: settings.footerCtaLink || emptySettings.footerCtaLink,
  };
}
