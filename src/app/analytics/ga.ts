import ReactGA from "react-ga4";
import { appConfig } from "@/config/appConfig";

export const initGA = () => {
  ReactGA.initialize(appConfig.googleAnalyticsId);
};

export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (action: string, category: string, label?: string) => {
  ReactGA.event({
    action,
    category,
    label,
  });
};
