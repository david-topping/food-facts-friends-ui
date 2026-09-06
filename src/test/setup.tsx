import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

window.ResizeObserver ??= ObserverStub as unknown as typeof ResizeObserver;
window.IntersectionObserver ??= ObserverStub as unknown as typeof IntersectionObserver;

if (typeof Element.prototype.scrollIntoView !== "function") {
  Element.prototype.scrollIntoView = vi.fn();
}

window.scrollTo = vi.fn();

vi.mock("@react-google-maps/api", () => ({
  useJsApiLoader: () => ({ isLoaded: true, loadError: undefined }),
  GoogleMap: ({ children }: { children?: ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  Marker: () => <div data-testid="map-marker" />,
}));

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: () => Promise.resolve(null),
}));

vi.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }: { children?: ReactNode }) => (
    <div data-testid="stripe-elements">{children}</div>
  ),
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => ({ confirmPayment: vi.fn().mockResolvedValue({}) }),
  useElements: () => ({}),
}));

vi.mock("react-ga4", () => ({
  default: { initialize: vi.fn(), send: vi.fn(), event: vi.fn() },
}));
