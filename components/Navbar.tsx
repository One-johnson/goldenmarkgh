"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CtaButton from "@/components/CtaButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

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
  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`block rounded-sm border-l-2 px-3 py-2 text-base font-medium transition-all duration-300 ${
          active
            ? "border-gold bg-gold/10 text-gold"
            : "border-transparent text-stone hover:border-gold/40 hover:bg-gold/5 hover:text-gold"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative inline-flex pb-1 text-base font-medium transition-colors duration-300 ${
        active ? "text-gold" : "text-stone hover:text-gold"
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-gold to-gold-light transition-transform duration-300 ease-out ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

interface NavbarProps {
  brandName: string;
  logo?: string;
  ctaText: string;
  ctaLink: string;
}

export default function Navbar({
  brandName,
  logo,
  ctaText,
  ctaLink,
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-gold/15 bg-surface/95 shadow-sm shadow-charcoal/10 backdrop-blur-md"
          : "border-transparent bg-surface/90 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label={`${brandName} home`}
          >
            {logo ? (
              <Image
                src={logo}
                alt={brandName}
                width={200}
                height={93}
                priority
                className="h-11 w-auto object-contain sm:h-12"
              />
            ) : (
              <span className="font-display text-3xl font-semibold tracking-tight text-gold">
                {brandName}
              </span>
            )}
          </Link>
          <span className="hidden rounded-sm border border-gold/25 bg-gold/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-muted sm:inline-block">
            GoldBod Licensed
          </span>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-gold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative h-6 w-6" aria-hidden>
            <span
              className={`absolute left-1/2 top-[7px] h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-[5px] rotate-45" : "translate-y-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-1/2 top-[11px] h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-[15px] h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "-translate-y-[5px] -rotate-45" : "translate-y-0 rotate-0"
              }`}
            />
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  active={pathname === link.href}
                />
              </li>
            ))}
          </ul>
          <CtaButton href={ctaLink} size="default" className="h-10 px-5">
            {ctaText}
          </CtaButton>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`grid md:hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`border-t bg-surface px-6 py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open
                ? "translate-y-0 border-gold/15 opacity-100"
                : "-translate-y-2 border-transparent opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
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
              <li className="pt-2">
                <CtaButton
                  href={ctaLink}
                  size="default"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {ctaText}
                </CtaButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
