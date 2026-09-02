import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for may have moved or no longer exists.",
  robots: { index: false, follow: false },
};

export default async function GlobalNotFound() {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground">
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
      </body>
    </html>
  );
}
