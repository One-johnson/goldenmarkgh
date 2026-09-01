import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getSettings } from "@/lib/content";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://goldenmarkgh.com";

const DEFAULT_DESCRIPTION =
  "GOLDENMARK GHANA LTD. (GMG) is a GoldBod-licensed Self-Financing Aggregator based in Greater Accra, Ghana — responsible gold sourcing, aggregation, trading and international commodities partnerships.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const titleDefault = `${settings.brandName} Ghana | GoldBod-Licensed Gold Aggregator`;
  const description = settings.footerBlurb || DEFAULT_DESCRIPTION;
  const logo = settings.logo || "/uploads/goldenmark-logo-header.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: titleDefault,
      template: `%s | ${settings.brandName} Ghana`,
    },
    description,
    applicationName: "GOLDENMARK GHANA LTD.",
    keywords: [
      "Goldenmark Ghana",
      "GOLDENMARK GHANA LTD",
      "GMG",
      "GoldBod",
      "Self-Financing Aggregator",
      "gold aggregation Ghana",
      "gold trading Accra",
      "responsible gold sourcing",
      "precious minerals Ghana",
      "gold off-take",
    ],
    authors: [{ name: "GOLDENMARK GHANA LTD." }],
    creator: "GOLDENMARK GHANA LTD.",
    publisher: "GOLDENMARK GHANA LTD.",
    category: "Business",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_GH",
      url: SITE_URL,
      siteName: "GOLDENMARK GHANA LTD.",
      title: titleDefault,
      description,
      images: [
        {
          url: logo,
          width: 640,
          height: 298,
          alt: "GOLDENMARK GHANA LTD. logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: [logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

async function OrganizationJsonLd() {
  const settings = await getSettings();
  const logo = settings.logo || "/uploads/goldenmark-logo-header.png";

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GOLDENMARK GHANA LTD.",
    alternateName: ["Goldenmark Ghana", "GMG", "Goldenmark"],
    url: SITE_URL,
    logo: `${SITE_URL}${logo}`,
    description: settings.footerBlurb || DEFAULT_DESCRIPTION,
    foundingDate: "2025-06-12",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Accra",
      addressCountry: "GH",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Greater Accra, Ghana",
    },
    knowsAbout: [
      "Gold sourcing and purchasing",
      "Gold aggregation",
      "Gold and precious minerals trading",
      "International commodities partnerships",
      "Responsible sourcing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground">
        <OrganizationJsonLd />
        <div className="flex min-h-full flex-col">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar
            brandName={settings.brandName}
            logo={settings.logo || undefined}
            ctaText={settings.navCtaText}
            ctaLink={settings.navCtaLink}
          />
          <main id="main-content" className="flex-1 scroll-mt-24">
            {children}
          </main>
          <Footer
            brandName={settings.brandName}
            logo={settings.logo || undefined}
            blurb={settings.footerBlurb}
            ctaText={settings.footerCtaText}
            ctaLink={settings.footerCtaLink}
          />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
