import MarkdownBody from "@/components/MarkdownBody";
import Reveal from "@/components/Reveal";
import { parseStorySections } from "@/lib/parse-story-sections";
import type { PageBody } from "@/lib/content";

interface AboutStorySectionProps {
  content: PageBody;
}

export default function AboutStorySection({ content }: AboutStorySectionProps) {
  const sections = parseStorySections(content);

  if (!sections.length) return null;

  return (
    <section className="border-t border-gold/15 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="section-label">About Goldenmark</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          Our story & progress
        </h2>
        <span aria-hidden className="gold-rule mt-6" />

        <div className="mt-14 space-y-16 lg:space-y-20">
          {sections.map((section, sectionIndex) => (
            <Reveal key={section.heading} delay={sectionIndex * 80}>
              <h3 className="font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
                {section.heading}
              </h3>
              <MarkdownBody
                content={section.body}
                className="about-story-prose mt-6 w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
