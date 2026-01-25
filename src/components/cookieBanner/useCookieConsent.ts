import { useCallback, useMemo, useState } from "react";
import { getCookieConsent, setCookieConsent, type CookieConsentValue } from "./cookieConsent";

type ConsentState = CookieConsentValue | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => getCookieConsent());

  const hasConsent = useMemo(() => consent === "accepted", [consent]);
  const showBanner = useMemo(() => consent === null, [consent]);

  const accept = useCallback(() => {
    setCookieConsent("accepted");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    setCookieConsent("rejected");
    setConsent("rejected");
  }, []);

  return {
    consent,
    hasConsent,
    showBanner,
    accept,
    reject,
  };
}
