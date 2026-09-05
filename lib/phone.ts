export function phoneToTelHref(phone: string): string {
  const primary = phone.split(/[/,]/)[0]?.trim() ?? phone;
  const digits = primary.replace(/[^\d+]/g, "");

  if (!digits) return "";

  return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits}`;
}
