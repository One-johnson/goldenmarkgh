import CtaButton from "@/components/CtaButton";

interface CtaBandProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CtaBand({
  heading,
  description,
  buttonText,
  buttonLink,
}: CtaBandProps) {
  if (!heading || !buttonText || !buttonLink) return null;

  return (
    <section className="bg-charcoal-elevated">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {heading}
          </h2>
          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-stone-light sm:text-xl">
              {description}
            </p>
          ) : null}
        </div>
        <CtaButton href={buttonLink} variant="goldLight">
          {buttonText}
        </CtaButton>
      </div>
    </section>
  );
}
