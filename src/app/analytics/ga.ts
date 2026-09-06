import ReactGA from "react-ga4";
import { appConfig } from "@/config/appConfig";

type EventParams = Record<string, string | number | boolean | undefined>;

export const initGA = () => {
  ReactGA.initialize(appConfig.googleAnalyticsId, {
    gtagOptions: { send_page_view: false },
  });
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path, title: document.title });
};

export const trackEvent = (name: string, params?: EventParams) => {
  ReactGA.event(name, params);
};
