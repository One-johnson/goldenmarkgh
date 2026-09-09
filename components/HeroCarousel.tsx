"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CtaButton from "@/components/CtaButton";
import type { HeroSlide } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  brandName: string;
  slides: HeroSlide[];
}

export default function HeroCarousel({ brandName, slides }: HeroCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayPlugin] = useState(() =>
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
    slides.length > 1 ? [autoplayPlugin] : [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const syncSelected = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", syncSelected).on("reInit", syncSelected);
    return () => {
      emblaApi.off("select", syncSelected).off("reInit", syncSelected);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || slides.length < 2) return;
    if (reduceMotion) {
      autoplayPlugin.stop();
      return;
    }
    autoplayPlugin.play();
  }, [autoplayPlugin, emblaApi, reduceMotion, slides.length]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (slides.length === 0) return null;

  const showControls = slides.length > 1;
  const hasImages = slides.some((slide) => Boolean(slide.image));

  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        {hasImages ? (
          slides.map((slide, index) =>
            slide.image ? (
              <div
                key={`${slide.image}-${index}`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  index === selectedIndex ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ) : null,
          )
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_25%,rgba(201,162,39,0.22),transparent_48%),radial-gradient(ellipse_at_85%_70%,rgba(24,67,54,0.55),transparent_42%),linear-gradient(155deg,#0f2e24_0%,#184336_50%,#0f2e24_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a882' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/35 to-charcoal/15" />
      </div>

      <div
        className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-40 lg:px-8 lg:pt-44"
        role="region"
        aria-roledescription="carousel"
        aria-label="Goldenmark highlights"
      >
        <p className="font-display text-6xl font-semibold tracking-tight text-gold-light sm:text-7xl lg:text-8xl">
          {brandName}
        </p>
        <span aria-hidden className="gold-rule mt-6" />

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
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
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Slide"
            >
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
    </>
  );
}
