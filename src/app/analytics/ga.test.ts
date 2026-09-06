import { vi } from "vitest";
import { initGA, trackEvent, trackPageView } from "./ga";

const { initialize, send, event } = vi.hoisted(() => ({
  initialize: vi.fn(),
  send: vi.fn(),
  event: vi.fn(),
}));

vi.mock("react-ga4", () => ({ default: { initialize, send, event } }));

describe("analytics/ga", () => {
  it("initialises GA with the measurement id and no automatic pageview", () => {
    initGA();
    expect(initialize).toHaveBeenCalledWith("G-TEST00000", {
      gtagOptions: { send_page_view: false },
    });
  });

  it("sends a pageview hit with the path and document title", () => {
    document.title = "Contact Us — Food Facts Friends";
    trackPageView("/contact");
    expect(send).toHaveBeenCalledWith({
      hitType: "pageview",
      page: "/contact",
      title: "Contact Us — Food Facts Friends",
    });
  });

  it("forwards a GA4-style event with params", () => {
    trackEvent("cta_click", { location: "home_need_support" });
    expect(event).toHaveBeenCalledWith("cta_click", { location: "home_need_support" });
  });

  it("forwards an event with no params", () => {
    trackEvent("donation_start_error");
    expect(event).toHaveBeenCalledWith("donation_start_error", undefined);
  });
});
