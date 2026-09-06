import { vi } from "vitest";
import { Routes, Route, useLocation } from "react-router-dom";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { HOME_CONTENT } from "@/content/home.content";
import { HomePage } from "./HomePage";

const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));
vi.mock("@/app/analytics/ga", () => ({ trackEvent }));

function LocationProbe() {
  return <div data-testid="pathname">{useLocation().pathname}</div>;
}

describe("HomePage", () => {
  it("renders the key sections", async () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", { name: HOME_CONTENT.needSupport.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: HOME_CONTENT.findUs.title })).toBeInTheDocument();
    expect(await screen.findByTestId("google-map")).toBeInTheDocument();
  });

  it("tracks and navigates from the Need Support CTA", async () => {
    renderWithProviders(
      <Routes>
        <Route
          path="*"
          element={
            <>
              <HomePage />
              <LocationProbe />
            </>
          }
        />
      </Routes>,
      { initialEntries: ["/"] },
    );

    await userEvent.click(
      screen.getByRole("button", { name: HOME_CONTENT.needSupport.button.label }),
    );

    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "home_need_support" });
    expect(screen.getByTestId("pathname")).toHaveTextContent(HOME_CONTENT.needSupport.button.route);
  });
});
