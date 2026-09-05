const CONSENT_KEY = "fff_cookie_consent";

export type CookieConsentValue = "accepted" | "essential";

export function setCookieConsent(value: CookieConsentValue, days = 180) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${CONSENT_KEY}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookieConsent(): CookieConsentValue | null {
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${CONSENT_KEY}=`));

  if (!match) return null;

  const value = match.split("=")[1];

  if (value === "accepted") return "accepted";
  if (value === "essential" || value === "rejected") return "essential";

  return null;
}

export function clearCookieConsent() {
  document.cookie = `${CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}
