/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ANALYTICS_ID: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_FFF_API_BASE_URL: string;
  /** Dev only: "true" forces the cookie banner to always show. */
  readonly VITE_FORCE_COOKIE_BANNER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
