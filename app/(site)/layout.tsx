import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
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
  );
}
