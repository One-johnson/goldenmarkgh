import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import RichTextBody from "@/components/RichTextBody";
import ProcessSteps from "@/components/ProcessSteps";
import WhyChooseUs from "@/components/WhyChooseUs";
import {
  getPageContent,
  getSettings,
  type HomeFrontmatter,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getPageContent<HomeFrontmatter>("home");
  return {
    title: {
      absolute:
        "Goldenmark Ghana | GoldBod-Licensed Self-Financing Aggregator",
    },
    description: data.heroDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title: "Goldenmark Ghana | GoldBod-Licensed Self-Financing Aggregator",
      description: data.heroDescription,
      url: "/",
    },
  };
}

export default async function HomePage() {
  const { data, content } = await getPageContent<HomeFrontmatter>("home");
  const settings = await getSettings();

  return (
    <>
      <Hero
        heading={data.heroHeading}
        description={data.heroDescription}
        ctaText={data.ctaText}
        ctaHref={data.ctaLink || "/services"}
        secondaryCtaText={data.secondaryCtaText}
        secondaryCtaHref={data.secondaryCtaLink}
        image={data.heroImage}
        brandName={settings.brandName}
      />
      <section id="content-start" className="page-shell scroll-mt-24">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <RichTextBody content={content} />
        </div>
        <ProcessSteps
          heading={data.processHeading}
          steps={data.processSteps ?? []}
        />
      </section>
      <WhyChooseUs
        heading={data.whyChooseUsHeading}
        items={data.whyChooseUs ?? []}
      />
      <CtaBand
        heading={data.ctaBandHeading}
        description={data.ctaBandDescription}
        buttonText={data.ctaBandButtonText}
        buttonLink={data.ctaBandButtonLink}
      />
    </>
  );
}
