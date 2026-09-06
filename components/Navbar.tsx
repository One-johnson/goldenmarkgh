"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CtaButton from "@/components/CtaButton";
import { headerNavLinks, type NavLinkItem } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function NavLink({
  href,
  label,
  active,
  mobile = false,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const external = isExternalHref(href);
  const className = mobile
    ? cn(
        "block font-display text-3xl font-semibold tracking-tight transition-colors duration-300 sm:text-4xl",
        active ? "text-gold-light" : "text-white hover:text-gold-light",
      )
    : cn(
        "group relative inline-flex pb-1 text-base font-medium transition-colors duration-300 sm:text-lg",
        active ? "text-gold-light" : "text-white/80 hover:text-gold-light",
      );

  const content = mobile ? (
    label
  ) : (
    <>
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-gold to-gold-light transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}

interface NavbarProps {
  brandName: string;
  logo?: string;
  badgeText?: string;
  links: NavLinkItem[];
  ctaText: string;
  ctaLink: string;
}

export default function Navbar({
  brandName,
  logo,
  badgeText,
  links,
  ctaText,
  ctaLink,
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = headerNavLinks(links);
  const solid = scrolled || open;
  const compact = scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        solid
          ? "border-gold/20 bg-charcoal"
          : "border-transparent bg-gradient-to-b from-charcoal/80 via-charcoal/45 to-transparent",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8",
          "transition-[padding] duration-300",
          compact ? "py-3.5 lg:py-4" : "py-5 lg:py-6",
        )}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-sm bg-surface px-2.5 py-1.5 transition-opacity hover:opacity-90 sm:px-3 sm:py-2"
            aria-label={`${brandName} home`}
          >
            {logo ? (
              <Image
                src={logo}
                alt={brandName}
                width={240}
                height={112}
                priority
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  compact
                    ? "h-12 sm:h-14"
                    : "h-14 sm:h-16 lg:h-[4.25rem]",
                )}
              />
            ) : (
              <span
                className={cn(
                  "font-display font-semibold tracking-tight text-gold transition-all duration-300",
                  compact ? "text-3xl" : "text-4xl",
                )}
              >
                {brandName}
              </span>
            )}
          </Link>
          {badgeText ? (
            <span className="hidden rounded-sm border border-gold/40 bg-gold/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light sm:inline-block sm:px-3.5 sm:py-2 sm:text-[0.8rem]">
              {badgeText}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-gold-light md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative h-7 w-7" aria-hidden>
            <span
              className={cn(
                "absolute left-1/2 top-[8px] h-0.5 w-6 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "translate-y-[6px] rotate-45" : "translate-y-0 rotate-0",
              )}
            />
            <span
              className={cn(
                "absolute left-1/2 top-[13px] h-0.5 w-6 -translate-x-1/2 rounded-full bg-current transition-opacity duration-200",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-1/2 top-[18px] h-0.5 w-6 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open
                  ? "-translate-y-[6px] -rotate-45"
                  : "translate-y-0 rotate-0",
              )}
            />
          </span>
        </button>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  active={pathname === link.href}
                />
              </li>
            ))}
          </ul>
          <CtaButton
            href={ctaLink}
            variant={solid ? "gold" : "goldOutline"}
            size="lg"
            className="h-11 px-6"
          >
            {ctaText}
          </CtaButton>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "grid md:hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-gold/20 bg-charcoal px-6 py-8">
            {badgeText ? (
              <p className="mb-6 w-fit rounded-sm border border-gold/40 bg-gold/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                {badgeText}
              </p>
            ) : null}
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={pathname === link.href}
                    mobile
                    onClick={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton
                href={ctaLink}
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {ctaText}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
