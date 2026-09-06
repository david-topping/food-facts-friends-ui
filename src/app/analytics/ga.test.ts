import { vi } from "vitest";
import { initGA, trackEvent, trackPageView } from "./ga";

const { initialize, send, event } = vi.hoisted(() => ({
  initialize: vi.fn(),
  send: vi.fn(),
  event: vi.fn(),
}));

vi.mock("react-ga4", () => ({ default: { initialize, send, event } }));

describe("analytics/ga", () => {
  it("initialises GA with the configured measurement id", () => {
    initGA();
    expect(initialize).toHaveBeenCalledWith("G-TEST00000");
  });

  it("sends a pageview hit", () => {
    trackPageView("/contact");
    expect(send).toHaveBeenCalledWith({ hitType: "pageview", page: "/contact" });
  });

  it("forwards a custom event", () => {
    trackEvent("click", "cta", "donate");
    expect(event).toHaveBeenCalledWith({ action: "click", category: "cta", label: "donate" });
  });
});
