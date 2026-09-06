export interface HeroSlide {
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

interface HeroSlideSource {
  heroHeading: string;
  heroDescription: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  ctaBandHeading?: string;
  ctaBandDescription?: string;
  heroSlides?: HeroSlide[] | null;
}

function hasCopy(slide: HeroSlide) {
  return Boolean(slide.heading?.trim() && slide.description?.trim());
}

export function resolveHeroSlides(data: HeroSlideSource): HeroSlide[] {
  const fromCms = (data.heroSlides ?? []).filter(hasCopy);
  if (fromCms.length > 0) return fromCms;

  return [
    {
      heading: data.heroHeading,
      description: data.heroDescription,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
      secondaryCtaText: data.secondaryCtaText,
      secondaryCtaLink: data.secondaryCtaLink,
    },
    {
      heading: "Licensed to operate. Built for Ghana’s regulated gold sector.",
      description:
        "Our GoldBod licence and structured operating processes provide a strong foundation for professional participation in Ghana’s regulated gold sector.",
      ctaText: "About us",
      ctaLink: "/about",
    },
    {
      heading: "Sourcing, aggregation, trading and international off-take.",
      description:
        "Responsible gold sourcing, aggregation, trading and international commodities partnerships — delivered as a GoldBod-licensed Self-Financing Aggregator.",
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
    },
    {
      heading: "International experience. Local presence in Greater Accra.",
      description:
        "Goldenmark Ghana combines a dedicated Ghanaian operation with the experience, expertise and international outlook of the wider Goldenmark group.",
      ctaText: "About us",
      ctaLink: "/about",
    },
    {
      heading: data.ctaBandHeading || "Ready to work with a licensed partner?",
      description:
        data.ctaBandDescription ||
        "Whether you supply gold or seek a professional aggregation and trading partner, our team is ready to discuss a structured, compliant engagement.",
      ctaText: "Partner with us",
      ctaLink: "/contact",
      secondaryCtaText: data.ctaText,
      secondaryCtaLink: data.ctaLink,
    },
  ].filter(hasCopy);
}