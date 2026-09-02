import CtaButton from "@/components/CtaButton";

export default function NotFoundContent() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="section-label">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl">
          Page not found
        </h1>
        <span aria-hidden className="gold-rule mx-auto mt-6" />
        <p className="mt-6 text-lg leading-relaxed text-stone">
          The page you are looking for may have moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CtaButton href="/">Back to home</CtaButton>
          <CtaButton href="/services" variant="outline">
            View services
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
