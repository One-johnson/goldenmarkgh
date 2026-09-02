import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { getPayload } from "payload";
import config from "@payload-config";
import { DEFAULT_DEPARTMENT_EMAILS } from "@/lib/contact-routing";

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
  intro?: string;
  emailInfo: string;
  emailTrade: string;
  emailFinance: string;
  emailOperations: string;
  emailCeo: string;
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
  brandName: "Goldenmark",
  footerBlurb: "",
  navCtaText: "Partner with us",
  navCtaLink: "/contact",
  footerCtaText: "Start a partnership inquiry",
  footerCtaLink: "/contact",
};

const emptyContact: ContactFrontmatter = {
  title: "Contact",
  ctaHeading: "Let's start a conversation",
  intro:
    "Reach GOLDENMARK GHANA LTD. by phone, department email or the inquiry form below.",
  emailInfo: DEFAULT_DEPARTMENT_EMAILS.info,
  emailTrade: DEFAULT_DEPARTMENT_EMAILS.trade,
  emailFinance: DEFAULT_DEPARTMENT_EMAILS.finance,
  emailOperations: DEFAULT_DEPARTMENT_EMAILS.operations,
  emailCeo: DEFAULT_DEPARTMENT_EMAILS.ceo,
  address: "Greater Accra, Ghana",
  phone: "",
  formHeading: "Send an inquiry",
  formDescription:
    "Choose the inquiry type that best matches your message. General inquiries go to info@.",
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
      emailTrade: data.emailTrade || emptyContact.emailTrade,
      emailFinance: data.emailFinance || emptyContact.emailFinance,
      emailOperations: data.emailOperations || emptyContact.emailOperations,
      emailCeo: data.emailCeo || emptyContact.emailCeo,
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
    brandName: settings.brandName || emptySettings.brandName,
    footerBlurb: settings.footerBlurb || emptySettings.footerBlurb,
    navCtaText: settings.navCtaText || emptySettings.navCtaText,
    navCtaLink: settings.navCtaLink || emptySettings.navCtaLink,
    footerCtaText: settings.footerCtaText || emptySettings.footerCtaText,
    footerCtaLink: settings.footerCtaLink || emptySettings.footerCtaLink,
  };
}
