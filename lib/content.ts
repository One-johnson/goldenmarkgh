import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { getPayload } from "payload";
import config from "@payload-config";
import { DEFAULT_INFO_EMAIL } from "@/lib/contact-routing";
import { DEFAULT_NAV_LINKS, type NavLinkItem } from "@/lib/nav-links";
import type { HeroSlide } from "@/lib/hero-slides";

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
  siteUrl?: string;
  brandName: string;
  logo?: string;
  favicon?: string;
  navBadgeText?: string;
  navLinks?: NavLinkItem[];
  navCtaText: string;
  navCtaLink: string;
  footerBlurb: string;
  footerCtaText: string;
  footerCtaLink: string;
  footerPagesHeading?: string;
  footerContactHeading?: string;
  footerCopyright?: string;
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
  heroSlides?: HeroSlide[];
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
  intro?: string;
  emailInfo: string;
  address: string;
  phone: string;
  formHeading?: string;
  formDescription?: string;
  formButtonText?: string;
  formSuccessMessage?: string;
}

export type PageSlug = "home" | "about" | "services" | "contact";

export type PageBody = DefaultTypedEditorState | string | null;

export interface PageContent<T> {
  data: T;
  content: PageBody;
}

const emptySettings: SiteSettings = {
  siteUrl: "https://goldenmarkgh.vercel.app",
  brandName: "Goldenmark",
  navBadgeText: "GoldBod Licensed",
  navLinks: DEFAULT_NAV_LINKS,
  footerBlurb: "",
  navCtaText: "Partner with us",
  navCtaLink: "/contact",
  footerCtaText: "Start a partnership inquiry",
  footerCtaLink: "/contact",
  footerPagesHeading: "Pages",
  footerContactHeading: "Contact Us",
  footerCopyright: "GOLDENMARK GHANA LTD. All rights reserved.",
};

const emptyContact: ContactFrontmatter = {
  title: "Contact",
  ctaHeading: "Let's start a conversation",
  intro:
    "Reach GOLDENMARK GHANA LTD. by phone, email or the inquiry form below.",
  emailInfo: DEFAULT_INFO_EMAIL,
  address: "Greater Accra, Ghana",
  phone: "+233 592 869 555/25",
  formHeading: "Send an inquiry",
  formDescription:
    "Share your message and our team will respond within one business day.",
  formButtonText: "Send message",
  formSuccessMessage:
    "Thank you — we received your inquiry and will reply within one business day.",
};

type PayloadGlobalMeta = {
  id?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  globalType?: unknown;
  body?: PageBody;
};

function stripMeta<T extends object>(doc: T) {
  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    globalType: _globalType,
    body,
    ...rest
  } = doc as T & PayloadGlobalMeta;

  return {
    data: rest as Omit<
      T,
      "id" | "createdAt" | "updatedAt" | "globalType" | "body"
    >,
    content: body ?? null,
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

  const { data, content } = stripMeta(doc);
  return {
    data: data as T,
    content,
  };
}

export async function getContactContent(): Promise<PageContent<ContactFrontmatter>> {
  const { data, content } = await getPageContent<Partial<ContactFrontmatter>>(
    "contact",
  );

  return {
    content,
    data: {
      ...emptyContact,
      ...data,
      title: data.title || emptyContact.title,
      emailInfo: data.emailInfo || emptyContact.emailInfo,
      address: data.address || emptyContact.address,
      phone: data.phone || emptyContact.phone,
      formHeading: data.formHeading || emptyContact.formHeading,
      formDescription: data.formDescription || emptyContact.formDescription,
      formButtonText: data.formButtonText || emptyContact.formButtonText,
      formSuccessMessage:
        data.formSuccessMessage || emptyContact.formSuccessMessage,
    },
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "settings",
    overrideAccess: true,
  });

  const { data } = stripMeta(doc);
  const settings = data as Partial<SiteSettings>;

  return {
    ...emptySettings,
    ...settings,
    siteUrl: settings.siteUrl || emptySettings.siteUrl,
    brandName: settings.brandName || emptySettings.brandName,
    navBadgeText: settings.navBadgeText ?? emptySettings.navBadgeText,
    navLinks:
      settings.navLinks && settings.navLinks.length > 0
        ? settings.navLinks
        : emptySettings.navLinks,
    footerBlurb: settings.footerBlurb || emptySettings.footerBlurb,
    navCtaText: settings.navCtaText || emptySettings.navCtaText,
    navCtaLink: settings.navCtaLink || emptySettings.navCtaLink,
    footerCtaText: settings.footerCtaText || emptySettings.footerCtaText,
    footerCtaLink: settings.footerCtaLink || emptySettings.footerCtaLink,
    footerPagesHeading:
      settings.footerPagesHeading || emptySettings.footerPagesHeading,
    footerContactHeading:
      settings.footerContactHeading || emptySettings.footerContactHeading,
    footerCopyright:
      settings.footerCopyright || emptySettings.footerCopyright,
  };
}
