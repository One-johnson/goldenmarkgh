"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CtaButton from "@/components/CtaButton";
import type { HeroSlide } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplay = useRef(
    Autoplay({
      delay: 6500,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 28, watchDrag: slides.length > 1 },
    slides.length > 1 ? [autoplay.current] : [],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || slides.length < 2) return;
    if (reduceMotion) {
      autoplay.current.stop();
      return;
    }
    autoplay.current.play();
  }, [emblaApi, reduceMotion, slides.length]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (slides.length === 0) return null;

  const showControls = slides.length > 1;

  return (
    <div
      className="mt-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="Goldenmark highlights"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <div
                key={`${slide.heading}-${index}`}
                className="flex min-h-[16rem] min-w-0 shrink-0 grow-0 basis-full flex-col sm:min-h-[20rem] lg:min-h-[22rem]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}`}
              >
                <Heading className="max-w-3xl font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.heading}
                </Heading>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-stone-light sm:text-2xl">
                  {slide.description}
                </p>
                {slide.ctaText && slide.ctaLink ? (
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <CtaButton href={slide.ctaLink} variant="goldLight">
                      {slide.ctaText}
                    </CtaButton>
                    {slide.secondaryCtaText && slide.secondaryCtaLink ? (
                      <CtaButton
                        href={slide.secondaryCtaLink}
                        variant="goldOutline"
                      >
                        {slide.secondaryCtaText}
                      </CtaButton>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {showControls ? (
        <div className="mt-12 flex items-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-gold/40 text-gold-light transition hover:border-gold hover:bg-gold/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide">
            {slides.map((slide, index) => (
              <button
                key={`dot-${slide.heading}-${index}`}
                type="button"
                role="tab"
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === selectedIndex}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === selectedIndex
                    ? "w-8 bg-gold-light"
                    : "w-2 bg-gold-light/35 hover:bg-gold-light/70",
                )}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-gold/40 text-gold-light transition hover:border-gold hover:bg-gold/10"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}