import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";

interface FooterProps {
  brandName: string;
  logo?: string;
  blurb: string;
  ctaText: string;
  ctaLink: string;
}

export default function Footer({
  brandName,
  logo,
  blurb,
  ctaText,
  ctaLink,
}: FooterProps) {
  return (
    <footer className="border-t border-gold/15 bg-charcoal text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md">
          {logo ? (
            <Link
              href="/"
              className="inline-flex rounded-sm bg-surface px-3 py-2 transition hover:opacity-90"
              aria-label={`${brandName} home`}
            >
              <Image
                src={logo}
                alt={brandName}
                width={180}
                height={84}
                className="h-12 w-auto object-contain"
              />
            </Link>
          ) : (
            <p className="font-display text-3xl font-semibold tracking-tight text-gold-light">
              {brandName}
            </p>
          )}
          <p className="mt-5 text-base leading-relaxed text-stone-light sm:text-lg">
            {blurb}
          </p>
          <CtaButton href={ctaLink} variant="goldLight" size="default" className="mt-6">
            {ctaText}
          </CtaButton>
        </div>

        <div className="flex gap-10 text-base">
          <div>
            <p className="font-medium text-gold-light">Pages</p>
            <ul className="mt-4 space-y-2.5 text-stone-light">
              <li>
                <Link href="/" className="transition hover:text-gold-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-gold-light">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition hover:text-gold-light"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-gold-light"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <p className="mx-auto max-w-6xl px-6 py-5 text-sm text-stone-light/70 lg:px-8">
          © {new Date().getFullYear()} GOLDENMARK GHANA LTD. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
