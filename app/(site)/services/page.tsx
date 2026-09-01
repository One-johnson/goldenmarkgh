import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import MarkdownBody from "@/components/MarkdownBody";
import ServiceCards from "@/components/ServiceCards";
import {
  getPageContent,
  getSettings,
  type ServicesFrontmatter,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getPageContent<ServicesFrontmatter>("services");
  return {
    title: "Gold Sourcing, Aggregation & Trading Services",
    description: data.description,
    alternates: { canonical: "/services" },
    openGraph: {
      title: "Gold Sourcing, Aggregation & Trading Services",
      description: data.description,
      url: "/services",
    },
  };
}

export default async function ServicesPage() {
  const { data, content } = await getPageContent<ServicesFrontmatter>("services");
  const settings = await getSettings();

  return (
    <div className="page-shell">
      <div className="bg-charcoal pb-16 pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-display text-3xl font-semibold tracking-tight text-gold-light sm:text-4xl">
            {settings.brandName}
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            {data.title}
          </h1>
          <span aria-hidden className="gold-rule mt-7" />
          <p className="mt-7 max-w-2xl text-xl text-stone-light sm:text-2xl">
            {data.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <ServiceCards services={data.services ?? []} />
        <MarkdownBody content={content} className="mx-auto mt-16 max-w-3xl" />
      </div>

      <CtaBand
        heading={data.ctaBandHeading}
        description={data.ctaBandDescription}
        buttonText={data.ctaBandButtonText}
        buttonLink={data.ctaBandButtonLink}
      />
    </div>
  );
}
