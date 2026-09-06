export interface NavLinkItem {
  label: string;
  href: string;
}

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
