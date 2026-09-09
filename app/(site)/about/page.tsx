import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import CtaLink from "@/components/CtaLink";
import AboutStorySection from "@/components/AboutStorySection";
import FeatureIcon from "@/components/FeatureIcon";
import Reveal from "@/components/Reveal";
import { resolveValueIcon } from "@/lib/section-icons";
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
      <div className="relative overflow-hidden bg-charcoal pb-12 pt-32 lg:pb-14 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(201,162,39,0.18),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(24,67,54,0.45),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-display text-2xl font-semibold tracking-tight text-gold-light sm:text-3xl">
            {settings.brandName}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <span aria-hidden className="gold-rule mt-5" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-light sm:text-xl">
            {data.companyDescription}
          </p>
        </div>
      </div>

      <section className="border-b border-gold/15 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3 sm:gap-10 lg:px-8 lg:py-12">
          {highlights.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-base text-stone sm:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="section-label">Mission</p>
            <span aria-hidden className="gold-rule mt-4" />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-charcoal sm:text-3xl">
              {data.mission}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-label">Vision</p>
            <span aria-hidden className="gold-rule mt-4" />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-charcoal sm:text-3xl">
              {data.vision}
            </p>
          </Reveal>
        </div>
      </section>

      {data.values && data.values.length > 0 ? (
        <section className="bg-[#2a5f4e] py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="section-label text-gold">Mission, vision & values</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gold-light sm:text-5xl">
              Our core values
            </h2>
            <span aria-hidden className="gold-rule mt-6" />

            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {data.values.map((value, index) => {
                const Icon = resolveValueIcon(value.title, index);

                return (
                  <Reveal
                    key={value.title}
                    as="li"
                    className="rounded-sm border border-gold/45 bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-gold hover:bg-secondary"
                    delay={index * 70}
                  >
                    <FeatureIcon icon={Icon} />
                    <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-stone">
                      {value.description}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <AboutStorySection content={content} />

      {data.complianceItems && data.complianceItems.length > 0 ? (
        <section className="border-t border-gold/15 bg-secondary py-20 text-charcoal lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="section-label">Compliance framework</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              {data.complianceHeading || "Compliance & Certifications"}
            </h2>
            <span aria-hidden className="gold-rule mt-6" />

            <ul className="mt-14 grid gap-10 sm:grid-cols-2">
              {data.complianceItems.map((item, index) => (
                <Reveal
                  key={item.label}
                  as="li"
                  className="border-t border-gold/30 pt-7"
                  delay={index * 60}
                >
                  <h3 className="font-display text-2xl font-semibold text-charcoal">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-stone">
                    {item.detail}
                  </p>
                </Reveal>
              ))}
            </ul>

            {data.ctaText && data.ctaLink ? (
              <div className="mt-14">
                <CtaLink
                  href={data.ctaLink}
                  className="inline-flex rounded-sm bg-gold px-6 py-3.5 text-base font-semibold text-charcoal transition hover:bg-gold-light"
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
