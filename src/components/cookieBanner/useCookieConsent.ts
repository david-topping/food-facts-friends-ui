import { useCallback, useEffect, useMemo, useState } from "react";
import { getCookieConsent } from "./cookieConsent";

type ConsentState = "accepted" | "rejected" | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    setConsent(existing);
    setIsLoaded(true);
  }, []);

  const hasConsent = useMemo(() => consent === "accepted", [consent]);

  const showBanner = useMemo(() => isLoaded && consent === null, [isLoaded, consent]);

  const accept = useCallback(() => {
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
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
