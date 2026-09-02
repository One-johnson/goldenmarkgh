import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import ScrollCue from "@/components/ScrollCue";

interface HeroProps {
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  image?: string;
  brandName?: string;
}

export default function Hero({
  heading,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  image,
  brandName = "Goldenmark",
}: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/50"
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_25%,rgba(96,72,48,0.35),transparent_48%),radial-gradient(ellipse_at_85%_70%,rgba(196,168,130,0.1),transparent_42%),linear-gradient(155deg,#2f2419_0%,#3d3024_50%,#2f2419_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a882' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32 lg:px-8 lg:pt-36">
        <p className="animate-fade-up font-display text-6xl font-semibold tracking-tight text-gold-light sm:text-7xl lg:text-8xl">
          {brandName}
        </p>
        <span
          aria-hidden
          className="animate-draw-line gold-rule mt-6"
        />
        <h1 className="animate-fade-up animation-delay-100 mt-8 max-w-3xl font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="animate-fade-up animation-delay-200 mt-6 max-w-2xl text-xl leading-relaxed text-stone-light sm:text-2xl">
          {description}
        </p>
        <div className="animate-fade-up animation-delay-300 mt-10 flex flex-wrap items-center gap-4">
          <CtaButton href={ctaHref} variant="goldLight">
            {ctaText}
          </CtaButton>
          {secondaryCtaText && secondaryCtaHref ? (
            <CtaButton href={secondaryCtaHref} variant="goldOutline">
              {secondaryCtaText}
            </CtaButton>
          ) : null}
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}
