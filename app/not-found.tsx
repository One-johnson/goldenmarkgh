import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";
import ScrollToTop from "@/components/ScrollToTop";
import { getSettings } from "@/lib/content";
import "./globals.css";

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

export default async function NotFound() {
  const settings = await getSettings();

  return (
    <div
      className={`${cormorant.variable} ${sourceSans.variable} flex min-h-full flex-col font-sans text-foreground`}
    >
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
        <NotFoundContent />
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
  );
}
