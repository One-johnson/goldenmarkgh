import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import CtaLink from "@/components/CtaLink";
import RichTextBody from "@/components/RichTextBody";
import Reveal from "@/components/Reveal";
import {
  getPageContent,
  getSettings,
  type AboutFrontmatter,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getPageContent<AboutFrontmatter>("about");
  return {
    title: "About GOLDENMARK GHANA LTD.",
    description: data.companyDescription,
    alternates: { canonical: "/about" },
    openGraph: {
      title: "About GOLDENMARK GHANA LTD.",
      description: data.companyDescription,
      url: "/about",
    },
  };
}

const highlights = [
  { value: "2025", label: "Established in Ghana" },
  { value: "GoldBod", label: "Licensed Self-Financing Aggregator" },
  { value: "Accra", label: "Greater Accra operations" },
];

export default async function AboutPage() {
  const { data, content } = await getPageContent<AboutFrontmatter>("about");
  const settings = await getSettings();

  return (
    <div className="page-shell">
      <div className="relative overflow-hidden bg-charcoal pb-20 pt-32 lg:pb-24 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(96,72,48,0.35),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(196,168,130,0.1),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-display text-3xl font-semibold tracking-tight text-gold-light sm:text-4xl">
            {settings.brandName}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {data.title}
          </h1>
          <span aria-hidden className="gold-rule mt-7" />
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-light sm:text-2xl">
            {data.companyDescription}
          </p>
        </div>
      </div>

      <section className="border-b border-gold/15 bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3 sm:gap-10 lg:px-8 lg:py-14">
          {highlights.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-semibold text-gold-light sm:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-base text-stone-light sm:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="section-label text-gold">Mission</p>
            <span aria-hidden className="gold-rule mt-4" />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              {data.mission}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-label text-gold">Vision</p>
            <span aria-hidden className="gold-rule mt-4" />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              {data.vision}
            </p>
          </Reveal>
        </div>
      </section>

      {data.values && data.values.length > 0 ? (
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="section-label">Mission, vision & values</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              Our core values
            </h2>
            <span aria-hidden className="gold-rule mt-6" />

            <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.values.map((value, index) => (
                <Reveal
                  key={value.title}
                  as="li"
                  className="border-t border-gold/30 pt-7"
                  delay={index * 70}
                >
                  <p className="font-display text-3xl font-semibold text-gold/35">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-stone">
                    {value.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-t border-gold/15 bg-surface/60 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="section-label">About Goldenmark</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                Our story & progress
              </h2>
              <span aria-hidden className="gold-rule mt-6" />
            </div>
            <RichTextBody content={content} />
          </div>
        </div>
      </section>

      {data.complianceItems && data.complianceItems.length > 0 ? (
        <section className="bg-charcoal py-20 text-white lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="section-label text-gold">Compliance framework</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gold-light sm:text-5xl">
              {data.complianceHeading || "Compliance & Certifications"}
            </h2>
            <span aria-hidden className="gold-rule mt-6" />

            <ul className="mt-14 grid gap-10 sm:grid-cols-2">
              {data.complianceItems.map((item, index) => (
                <Reveal
                  key={item.label}
                  as="li"
                  className="border-t border-gold/20 pt-7"
                  delay={index * 60}
                >
                  <h3 className="font-display text-2xl font-semibold text-gold-light">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-stone-light">
                    {item.detail}
                  </p>
                </Reveal>
              ))}
            </ul>

            {data.ctaText && data.ctaLink ? (
              <div className="mt-14">
                <CtaLink
                  href={data.ctaLink}
                  className="inline-flex rounded-sm bg-gold-light px-6 py-3.5 text-base font-semibold text-charcoal transition hover:bg-white"
                >
                  {data.ctaText}
                </CtaLink>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <CtaBand
        heading={data.ctaBandHeading}
        description={data.ctaBandDescription}
        buttonText={data.ctaBandButtonText}
        buttonLink={data.ctaBandButtonLink}
      />
    </div>
  );
}
