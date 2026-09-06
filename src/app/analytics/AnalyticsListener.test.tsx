import { vi } from "vitest";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "@/test/utils";
import { AnalyticsListener } from "./AnalyticsListener";

const { trackPageView } = vi.hoisted(() => ({ trackPageView: vi.fn() }));

vi.mock("./ga", () => ({ trackPageView }));

function renderAt(path: string) {
  return renderWithProviders(
    <Routes>
      <Route path="*" element={<AnalyticsListener />} />
    </Routes>,
    { initialEntries: [path] },
  );
}

describe("AnalyticsListener", () => {
  it("tracks a pageview for the current path including the query string", () => {
    renderAt("/donate/success?redirect_status=succeeded");
    expect(trackPageView).toHaveBeenCalledWith("/donate/success?redirect_status=succeeded");
  });

  it("sets the document title from the matched route", () => {
    renderAt("/contact");
    expect(document.title).toBe("Contact Us — Food Facts Friends");
  });

  it("falls back to the site name for an unknown route", () => {
    renderAt("/nowhere");
    expect(document.title).toBe("Food Facts Friends");
  });
});
