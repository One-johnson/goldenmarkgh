import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactSection from "@/components/ContactSection";
import ContactHero from "@/components/contact/ContactHero";
import FadeInView from "@/components/contact/FadeInView";
import RichTextBody from "@/components/RichTextBody";
import {
  getContactContent,
  getSettings,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getContactContent();
  return {
    title: "Contact Us",
    description:
      data.intro ||
      "Contact GOLDENMARK GHANA LTD. for trading, finance, operations and partnership inquiries.",
    alternates: { canonical: "/contact" },
    openGraph: {
      title: "Contact GOLDENMARK GHANA LTD.",
      description:
        data.intro ||
        "Reach our Greater Accra team for licensed gold aggregation and commercial inquiries.",
      url: "/contact",
    },
  };
}

export default async function ContactPage() {
  const { data, content } = await getContactContent();
  const settings = await getSettings();

  return (
    <div className="page-shell">
      <ContactHero
        brandName={settings.brandName}
        title={data.ctaHeading || data.title}
        intro={data.intro}
      />

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        {content ? (
          <FadeInView className="mx-auto mb-14 max-w-3xl">
            <RichTextBody content={content} />
          </FadeInView>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <ContactSection
            address={data.address}
            phone={data.phone}
            emails={{
              info: data.emailInfo,
              trade: data.emailTrade,
              finance: data.emailFinance,
              operations: data.emailOperations,
              ceo: data.emailCeo,
            }}
          />
          <ContactForm
            heading={data.formHeading}
            description={data.formDescription}
            buttonText={data.formButtonText}
            successMessage={data.formSuccessMessage}
          />
        </div>
      </div>
    </div>
  );
}
