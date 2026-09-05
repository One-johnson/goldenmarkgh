import { Mail, MapPin, Phone } from "lucide-react";
import { phoneToTelHref } from "@/lib/phone";

interface ContactDetailsProps {
  title?: string;
  email: string;
  address: string;
  phone: string;
  variant?: "light" | "dark";
}

export default function ContactDetails({
  title = "Contact Us",
  email,
  address,
  phone,
  variant = "light",
}: ContactDetailsProps) {
  const phoneHref = phoneToTelHref(phone);
  const isDark = variant === "dark";

  const titleClass = isDark
    ? "font-medium text-gold-light"
    : "font-display text-2xl font-semibold text-charcoal sm:text-3xl";

  const iconClass = isDark
    ? "mt-0.5 h-4 w-4 shrink-0 text-gold-light"
    : "mt-0.5 h-5 w-5 shrink-0 text-gold";

  const labelClass = isDark
    ? "text-xs font-semibold uppercase tracking-[0.14em] text-gold-light/80"
    : "section-label";

  const valueClass = isDark
    ? "text-base text-stone-light transition hover:text-gold-light"
    : "text-base text-charcoal transition hover:text-gold-muted sm:text-lg";

  const staticValueClass = isDark
    ? "text-base text-stone-light"
    : "text-base text-charcoal sm:text-lg";

  const itemClass = isDark ? "flex gap-3" : "flex gap-4";

  return (
    <div>
      <p className={titleClass}>{title}</p>
      {!isDark ? <span aria-hidden className="gold-rule mt-5" /> : null}
      <ul className={`${isDark ? "mt-4" : "mt-6"} space-y-4`}>
        <li className={itemClass}>
          <Mail className={iconClass} aria-hidden />
          <div>
            <p className={labelClass}>Email</p>
            <a href={`mailto:${email}`} className={`mt-1 block ${valueClass}`}>
              {email}
            </a>
          </div>
        </li>
        <li className={itemClass}>
          <MapPin className={iconClass} aria-hidden />
          <div>
            <p className={labelClass}>Address</p>
            <p className={`mt-1 ${staticValueClass}`}>{address}</p>
          </div>
        </li>
        <li className={itemClass}>
          <Phone className={iconClass} aria-hidden />
          <div>
            <p className={labelClass}>Main number</p>
            {phoneHref ? (
              <a href={phoneHref} className={`mt-1 block ${valueClass}`}>
                {phone}
              </a>
            ) : (
              <p className={`mt-1 ${staticValueClass}`}>{phone}</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
