import { vi } from "vitest";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "@/test/utils";
import { AnalyticsListener } from "./AnalyticsListener";

const { trackPageView } = vi.hoisted(() => ({ trackPageView: vi.fn() }));

vi.mock("./ga", () => ({ trackPageView }));

describe("AnalyticsListener", () => {
  it("tracks a pageview for the current path", () => {
    renderWithProviders(
      <Routes>
        <Route path="/contact" element={<AnalyticsListener />} />
      </Routes>,
      { initialEntries: ["/contact"] },
    );

    expect(trackPageView).toHaveBeenCalledWith("/contact");
  });
});
