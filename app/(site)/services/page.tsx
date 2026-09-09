import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import RichTextBody from "@/components/RichTextBody";
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
      <div className="bg-charcoal pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-display text-2xl font-semibold tracking-tight text-gold-light sm:text-3xl">
            {settings.brandName}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <span aria-hidden className="gold-rule mt-5" />
          <p className="mt-5 max-w-2xl text-lg text-stone-light sm:mt-6 sm:text-xl">
            {data.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <ServiceCards services={data.services ?? []} />
        <RichTextBody content={content} className="mx-auto mt-16 max-w-3xl" />
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
