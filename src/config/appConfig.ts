import { z } from "zod";

const envSchema = z.object({
  VITE_GOOGLE_ANALYTICS_ID: z.string().min(1),
  VITE_GOOGLE_MAPS_API_KEY: z.string().min(1),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  VITE_FFF_API_BASE_URL: z.string().min(1),
  VITE_FORCE_COOKIE_BANNER: z.string().optional(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", z.flattenError(parsed.error).fieldErrors);
  throw new Error("Invalid environment variables — check the console and your .env file.");
}

const env = parsed.data;

export const appConfig = {
  googleAnalyticsId: env.VITE_GOOGLE_ANALYTICS_ID,
  googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
  stripePublishableKey: env.VITE_STRIPE_PUBLISHABLE_KEY,
  apiBaseUrl: env.VITE_FFF_API_BASE_URL,
  /** Dev-only helper — see src/components/cookieBanner/useCookieConsent.ts */
  forceCookieBanner: import.meta.env.DEV && env.VITE_FORCE_COOKIE_BANNER === "true",
} as const;
