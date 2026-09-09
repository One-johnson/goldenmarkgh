export interface HeroSlide {
  heading: string;
  description: string;
  image?: string;
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

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    heading: "Quality at the Heart of Every Trade",
    description:
      "A commitment to quality, integrity and value in every gold transaction.",
    image: "/gold/gold-inspection.png",
    ctaText: "Explore our services",
    ctaLink: "/services",
    secondaryCtaText: "About us",
    secondaryCtaLink: "/about",
  },
  {
    heading: "Transparent Trade. Lasting Partnerships.",
    description:
      "Building confidence through clear communication and a shared commitment to value.",
    image: "/gold/document-review.png",
    ctaText: "About us",
    ctaLink: "/about",
  },
  {
    heading: "Responsibly Sourced. Purposefully Traded.",
    description:
      "Responsible gold sourcing that puts integrity and accountability first.",
    image: "/gold/sourcing.png",
    ctaText: "Explore our services",
    ctaLink: "/services",
  },
  {
    heading: "Precision and Care at Every Step",
    description:
      "Bringing gold together with careful handling and attention to every detail.",
    image: "/gold/aggregation.png",
    ctaText: "About us",
    ctaLink: "/about",
  },
  {
    heading: "Connecting Resources. Creating Value.",
    description:
      "Connecting Ghana’s gold and precious minerals with meaningful trading partnerships.",
    image: "/gold/partnership.png",
    ctaText: "Partner with us",
    ctaLink: "/contact",
    secondaryCtaText: "Explore our services",
    secondaryCtaLink: "/services",
  },
];

const IMAGE_BY_HEADING = Object.fromEntries(
  DEFAULT_HERO_SLIDES.map((slide) => [slide.heading, slide.image]),
) as Record<string, string | undefined>;

function hasCopy(slide: HeroSlide) {
  return Boolean(slide.heading?.trim() && slide.description?.trim());
}

function withSlideImage(slide: HeroSlide, index: number): HeroSlide {
  return {
    ...slide,
    image:
      slide.image ||
      IMAGE_BY_HEADING[slide.heading] ||
      DEFAULT_HERO_SLIDES[index]?.image,
  };
}

export function resolveHeroSlides(data: HeroSlideSource): HeroSlide[] {
  const fromCms = (data.heroSlides ?? []).filter(hasCopy);
  if (fromCms.length > 0) {
    return fromCms.map(withSlideImage);
  }

  return DEFAULT_HERO_SLIDES.map(withSlideImage);
}
