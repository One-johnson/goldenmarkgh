export const DEFAULT_INFO_EMAIL = "info@goldenmarkghana.com";

export function resolveInfoEmail(email?: string | null): string {
  const trimmed = email?.trim();
  return trimmed || DEFAULT_INFO_EMAIL;
}
