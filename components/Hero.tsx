import HeroCarousel from "@/components/HeroCarousel";
import ScrollCue from "@/components/ScrollCue";
import type { HeroSlide } from "@/lib/hero-slides";

interface HeroProps {
  brandName?: string;
  slides: HeroSlide[];
}

export default function Hero({
  brandName = "Goldenmark",
  slides,
}: HeroProps) {
  return (
    <section className="relative flex items-center overflow-hidden bg-charcoal sm:min-h-[88svh] lg:min-h-[100svh]">
      <HeroCarousel brandName={brandName} slides={slides} />
      <ScrollCue className="hidden sm:flex" />
    </section>
  );
}
