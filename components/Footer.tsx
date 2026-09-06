import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import ContactDetails from "@/components/ContactDetails";
import type { NavLinkItem } from "@/lib/nav-links";

interface FooterProps {
  brandName: string;
  logo?: string;
  blurb: string;
  ctaText: string;
  ctaLink: string;
  pagesHeading: string;
  contactHeading: string;
  copyright: string;
  navLinks: NavLinkItem[];
  email: string;
  address: string;
  phone: string;
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Footer({
  brandName,
  logo,
  blurb,
  ctaText,
  ctaLink,
  pagesHeading,
  contactHeading,
  copyright,
  navLinks,
  email,
  address,
  phone,
}: FooterProps) {
  return (
    <footer className="border-t border-gold/15 bg-charcoal text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-8">
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

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-12 lg:gap-16">
          <div>
            <p className="font-medium text-gold-light">{pagesHeading}</p>
            <ul className="mt-4 space-y-2.5 text-base text-stone-light">
              {navLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  {isExternalHref(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-gold-light"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <ContactDetails
            title={contactHeading}
            email={email}
            address={address}
            phone={phone}
            variant="dark"
          />
        </div>
      </div>

      <div className="border-t border-gold/10">
        <p className="mx-auto max-w-6xl px-6 py-5 text-sm text-stone-light/70 lg:px-8">
          © {new Date().getFullYear()} {copyright}
        </p>
      </div>
    </footer>
  );
}
