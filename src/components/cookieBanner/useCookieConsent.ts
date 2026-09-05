import { useCallback, useMemo, useState } from "react";
import { appConfig } from "@/config/appConfig";
import { getCookieConsent, setCookieConsent, type CookieConsentValue } from "./cookieConsent";

type ConsentState = CookieConsentValue | null;

const forceBanner = appConfig.forceCookieBanner;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(() =>
    forceBanner ? null : getCookieConsent(),
  );

  const hasConsent = useMemo(() => consent === "accepted", [consent]);
  const showBanner = useMemo(() => consent === null, [consent]);

  const acceptAll = useCallback(() => {
    setCookieConsent("accepted");
    setConsent("accepted");
  }, []);

  const acceptEssential = useCallback(() => {
    setCookieConsent("essential");
    setConsent("essential");
  }, []);

  return {
    consent,
    hasConsent,
    showBanner,
    acceptAll,
    acceptEssential,
  };
}
