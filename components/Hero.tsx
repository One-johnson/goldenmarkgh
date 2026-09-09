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
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal">
      <HeroCarousel brandName={brandName} slides={slides} />
      <ScrollCue />
    </section>
  );
}
