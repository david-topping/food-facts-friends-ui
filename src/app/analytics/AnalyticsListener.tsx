import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/routes/routes";
import { trackPageView } from "./ga";

const SITE_NAME = "Food Facts Friends";

export function AnalyticsListener() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const route = APP_ROUTES.find((entry) => entry.path === pathname);
    document.title = route ? `${route.label} — ${SITE_NAME}` : SITE_NAME;

    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}
