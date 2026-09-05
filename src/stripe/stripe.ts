import { loadStripe } from "@stripe/stripe-js";
import { appConfig } from "@/config/appConfig";

export const stripePromise = loadStripe(appConfig.stripePublishableKey);
