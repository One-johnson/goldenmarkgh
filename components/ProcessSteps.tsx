import Reveal from "@/components/Reveal";
import FeatureIcon from "@/components/FeatureIcon";
import { resolveProcessIcon } from "@/lib/section-icons";
import type { TitleDescriptionItem } from "@/lib/content";

interface ProcessStepsProps {
  heading?: string;
  steps: TitleDescriptionItem[];
}

export default function ProcessSteps({
  heading = "Our Process",
  steps,
}: ProcessStepsProps) {
  if (!steps.length) return null;

  return (
    <section className="border-t border-gold/15 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="section-label">The Goldenmark process</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          {heading}
        </h2>
        <span aria-hidden className="gold-rule animate-draw-line mt-6" />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {steps.map((step, index) => {
            const Icon = resolveProcessIcon(step.title, index);

            return (
              <Reveal key={step.title} as="li" delay={index * 100}>
                <FeatureIcon icon={Icon} />
                <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-stone sm:text-lg">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
